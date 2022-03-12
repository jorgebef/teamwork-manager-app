import { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material'
import {
  ExpandMoreRounded,
  DeleteRounded,
  EditRounded,
  FlagRounded,
  MoreHorizRounded,
  RemoveRounded,
} from '@mui/icons-material'
import { TaskWithId, ITask } from '../util/types'
import moment from 'moment'
import { styled } from '@mui/system'
import Image from 'next/image'
import profile2 from '../public/profile1.jpg'
import TaskForm from './TaskForm'

interface ITaskListProps {
  tasks: TaskWithId[]
}

const TaskList = ({ tasks }: ITaskListProps) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [modalEdit, setModalEdit] = useState(false)
  // const [modalCreate, setModalCreate] = useState(false)
  const [taskEdit, setTaskEdit] = useState<ITask | null>(null)
  const [optsMenuEl, setOptsMenuEl] = useState<HTMLElement | null>(null)
  const theme = useTheme()

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

  const handleCloseEditModal = (e: React.SyntheticEvent, reason?: string) => {
    // Here we handle the case were we click on the backdrop
    // by having a conditional prop "reason", we can use this
    // function both in onClose and onClick
    if (reason === 'backdropClick') return
    setModalEdit(false)
  }

  const handleOpenEditModal = (task: ITask) => {
    console.log(task.modifiedAt)
    setOptsMenuEl(null)
    setTaskEdit(task)
    setModalEdit(true)
  }

  const handleCloseOpts = () => {
    setOptsMenuEl(null)
  }

  const handleOpenOpts = (e: React.MouseEvent<HTMLElement>) => {
    setOptsMenuEl(e.currentTarget)
  }

  const CustomRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  })

  return (
    <Container>
      {tasks.map((task: TaskWithId) => {
        return (
          <>
            <Accordion
              key={task.id}
              expanded={expanded === task.id}
              onChange={handleExpandTask(task.id)}
              elevation={0}
              sx={{
                backgroundColor:
                  expanded === task.id ? theme.palette.grey[100] : null,
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
                  cursor: expanded === task.id ? 'default !important' : 'auto',
                }}
              >
                <Typography
                  noWrap={expanded === task.id ? false : true}
                  fontSize={18}
                  fontWeight={500}
                  sx={{ width: '100%', alignSelf: 'center' }}
                >
                  {task.title}
                </Typography>

                {/* <IconButton */}
                {/*   onClick={handleOpenOpts} */}
                {/*   sx={{ */}
                {/*     display: expanded === task.id ? 'flex' : 'none', */}
                {/*     mr: 1, */}
                {/*   }} */}
                {/* > */}
                {/*   <MoreHorizRounded /> */}
                {/* </IconButton> */}

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
                    // onClick={() => handleOpenEditModal(task)}
                  >
                    <DeleteRounded color='error' />
                  </IconButton>
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
                    <FlagRounded color='warning' />
                    <Typography fontWeight={500}>
                      {moment(task.dueDate).format('MMM Do, YYYY')}
                    </Typography>
                  </CustomRow>

                  <CustomRow>
                    <Avatar sx={{ width: 35, height: 35 }}>
                      <Image alt='user1' src={profile2} quality={20} />
                    </Avatar>
                    <Typography fontWeight={500}>{task.asignee}</Typography>
                  </CustomRow>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Menu
              id={task.id + '-menu'}
              anchorEl={optsMenuEl}
              open={Boolean(optsMenuEl)}
              onClose={handleCloseOpts}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
            >
              <MenuItem onClick={() => handleOpenEditModal(task)}>
                <ListItemIcon>
                  <EditRounded fontSize='small' />
                </ListItemIcon>
                Edit
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteRounded color='error' fontSize='small' />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </>
        )
      })}

      <TaskForm
        taskEdit={taskEdit}
        open={modalEdit}
        handleClose={handleCloseEditModal}
      />

    </Container>
  )
}

export default TaskList
