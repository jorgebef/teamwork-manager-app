import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import {
  ExpandMoreRounded,
  DeleteRounded,
  EditRounded,
  FlagRounded,
  GroupsRounded,
} from '@mui/icons-material'
import moment from 'moment'
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import { styled } from '@mui/system'
import { ITask, IUser } from '../util/types'
import { useTaskListCtx } from '../context/TaskListCtx'
import { useAuthCtx } from '../context/AuthCtx'
import { useUserTeams } from '../hooks/teams'
import { useEffect, useState } from 'react'
import { useTeamUsers } from '../hooks/users'
import { useTask } from '../hooks/tasks'

interface TaskAccordionProps {
  task: ITask
}

const TaskAccordion = ({ task }: TaskAccordionProps) => {
  const theme = useTheme()
  const { user } = useAuthCtx()
  const {
    expanded,
    setExpanded,
    setTaskFormModal,
    setTaskDelModal,
    setTaskEdit,
  } = useTaskListCtx()
  const userTeamsData = useUserTeams(user!.uid)
  const [passedTask, setPassedTask] = useState<ITask | null>(null)

  useEffect(() => {
    if (!task) return
    setPassedTask(task)
  }, [task])

  const taskData = useTask(passedTask?.id)
  const taskParentMembers = useTeamUsers(taskData?.parent)

  const CustomRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  })

  const handleExpandTask =
    (panel: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      // Disable closing the Accordion by clicking the Sumary only when open
      // force the user to use the closing arrow
      // This way we can implement the MoreHorizRounded icon for editing and deleting
      if (expanded === e.currentTarget.id) return
      setExpanded(isExpanded ? panel : false)
    }

  const handleUnexpandTask = () => {
    setExpanded(false)
  }

  const handleOpenDelModal = (task: ITask) => {
    setTaskEdit(task)
    setTaskDelModal(true)
  }

  const handleOpenEditModal = (task: ITask) => {
    setTaskEdit(task)
    setTaskFormModal(true)
  }

  return (
    <Accordion
      key={task.id}
      expanded={expanded === task.id}
      onChange={handleExpandTask(task.id!)}
      elevation={0}
      sx={{
        backgroundColor:
          expanded === task.id
            ? theme.palette.grey[200]
            : theme.palette.grey[50],
      }}
    >
      <AccordionSummary
        id={task.id}
        expandIcon={
          <IconButton onClick={handleUnexpandTask}>
            <ExpandMoreRounded />
          </IconButton>
        }
        aria-controls='panel1bh-content'
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: expanded === task.id ? 'default !important' : 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            noWrap={expanded === task.id ? false : true}
            fontSize={18}
            fontWeight={500}
            sx={{
              maxWidth: { xs: 200, sm: 370, md: 500, lg: 800 },
              width: '100%',
            }}
          >
            {task.title}
          </Typography>

          <Box
            sx={{
              display: expanded === task.id ? 'flex' : 'none',
              gap: 1,
              mr: 1,
            }}
          >
            <IconButton
              aria-label='Edit'
              onClick={() => handleOpenEditModal(task)}
            >
              <EditRounded />
            </IconButton>
            <IconButton
              aria-label='Delete'
              // onClick={e => handleDelete(task.id, e)}
              onClick={() => handleOpenDelModal(task)}
            >
              <DeleteRounded color='error' />
            </IconButton>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography fontWeight={400}>{task.description}</Typography>

          <CustomRow>
            <FlagRounded color='success' fontSize='medium' />
            <Typography fontWeight={500}>
              {moment(task.dueDate).format('MMM Do, YYYY')}
            </Typography>
          </CustomRow>

          <CustomRow>
            <GroupsRounded color='info' fontSize='medium' />
            <Typography fontWeight={500}>
              {userTeamsData?.find(team => team.id == task.parent)?.name}
            </Typography>
          </CustomRow>

          <CustomRow>
            <Avatar
              src={
                taskParentMembers?.find(
                  (member: IUser) => member.uid == task.assignedTo
                )?.profilePic
              }
              sx={{ width: 24, height: 24 }}
            />
            <Typography fontWeight={500}>
              {
                taskParentMembers?.find(member => member.uid == task.assignedTo)
                  ?.userName
              }
            </Typography>
          </CustomRow>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default TaskAccordion
