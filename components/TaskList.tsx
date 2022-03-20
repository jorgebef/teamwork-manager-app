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
  // Snackbar,
  useTheme,
} from '@mui/material'
import {
  ExpandMoreRounded,
  DeleteRounded,
  EditRounded,
  FlagRounded,
  GroupsRounded,
  // MoreHorizRounded,
} from '@mui/icons-material'
import moment from 'moment'
import { styled } from '@mui/system'
import TaskForm from './TaskFormModal'
import { useAlertCtx } from '../context/AlertCtx'
import { deleteTask } from '../firebase/task'
import TaskDelModal from './TaskDelModal'
import { useAuthCtx } from '../context/AuthCtx'
import {
  ITeamWithId,
  IUser,
  TaskWithId,
} from '../util/types'
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/config'

interface ITaskListProps {
  tasks: TaskWithId[]
}

const TaskList = ({ tasks }: ITaskListProps) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [taskFormModal, setTaskFormModal] = useState<boolean>(false)
  const [taskDelModal, setTaskDelModal] = useState<boolean>(false)
  // const [modalCreate, setModalCreate] = useState(false)
  const [taskEdit, setTaskEdit] = useState<TaskWithId | null>(null)
  const [optsMenuEl, setOptsMenuEl] = useState<HTMLElement | null>(null)
  const [userData, setUserData] = useState<Partial<IUser>>({})
  const [teamsData, setTeamsData] = useState<Partial<ITeamWithId>[]>([])
  const [membersData, setMembersData] = useState<Partial<IUser>[]>([])
  const theme = useTheme()
  const { alertShow } = useAlertCtx()
  const { user } = useAuthCtx()

  useEffect(() => {
    if (!user) return
    const userCollectionRef = collection(db, 'users')
    const qUser = query(userCollectionRef, where(documentId(), '==', user.uid))
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      querySnapshot.forEach(doc => {
        setUserData({
          uid: doc.data().uid,
          teams: doc.data().teams,
        })
      })
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!userData || !userData.teams || userData.teams.length == 0) return
    const teamsCollectionRef = collection(db, 'teams')
    const qTeams = query(
      teamsCollectionRef,
      where(documentId(), 'in', userData.teams)
    )
    const unsubscribe = onSnapshot(qTeams, querySnapshot => {
      setTeamsData(
        querySnapshot.docs.map<Partial<ITeamWithId>>(doc => ({
          ...doc.data(),
          id: doc.id,
          name: doc.data().name,
          members: doc.data().members,
        }))
      )
    })
    return unsubscribe
  }, [userData])

  useEffect(() => {
    if (!teamsData) return
    const members: string[] = []
    teamsData.map(team => {
      if (team.members) members.push(...team.members)
    })
    if (members.length == 0) return
    const membersCollectionRef = collection(db, 'users')
    const qMembers = query(
      membersCollectionRef,
      where(documentId(), 'in', members)
    )
    const unsubscribe = onSnapshot(qMembers, querySnapshot => {
      setMembersData(
        querySnapshot.docs.map<Partial<IUser>>(doc => ({
          ...doc.data(),
          uid: doc.id,
          userName: doc.data().userName,
          email: doc.data().email,
          profilePic: doc.data().profilePic,
        }))
      )
    })
    return unsubscribe
  }, [teamsData])

  useEffect(() => {
    // console.log(membersData)
  }, [membersData])

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

  const handleCloseFormModal = (e: React.SyntheticEvent, reason?: string) => {
    // Here we handle the case were we click on the backdrop
    // by having a conditional prop "reason", we can use this
    // function both in onClose and onClick
    if (reason === 'backdropClick') return
    setTaskFormModal(false)
  }

  const handleOpenDelModal = (task: TaskWithId) => {
    setTaskEdit(task)
    setTaskDelModal(true)
  }

  const handleCloseDelModal = (e: React.SyntheticEvent, reason?: string) => {
    setTaskDelModal(false)
  }

  const handleOpenCreateModal = () => {
    setTaskEdit(null)
    // console.log(task.modifiedAt)
    setOptsMenuEl(null)
    setTaskFormModal(true)
  }

  const handleOpenEditModal = (task: TaskWithId) => {
    setTaskEdit(task)
    console.log(task.modifiedAt)
    setOptsMenuEl(null)
    setTaskFormModal(true)
  }

  const handleCloseOpts = () => {
    setOptsMenuEl(null)
  }

  const handleOpenOpts = (e: React.MouseEvent<HTMLElement>) => {
    setOptsMenuEl(e.currentTarget)
  }

  const handleDelete = async (
    task: TaskWithId | null,
    e: React.SyntheticEvent
  ) => {
    e.stopPropagation()
    if (!task || !user) return
    setTaskDelModal(false)
    const deleteRes = await deleteTask(task.id, user.uid).then(r => r)
    // alert(`Delete ${docRef.id} successfully`)
    alertShow(`Successfully deleted task id ${deleteRes?.taskId} !!`, 'error')
  }

  const CustomRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  })

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          {tasks.length == 0 ? (
            <Typography>NO TASKS</Typography>
          ) : (
            tasks.map((task: TaskWithId) => {
              return (
                <>
                  <Accordion
                    key={task.id}
                    expanded={expanded === task.id}
                    onChange={handleExpandTask(task.id)}
                    elevation={0}
                    sx={{
                      backgroundColor:
                        expanded === task.id
                          ? theme.palette.grey[200]
                          : theme.palette.grey[50],
                      // borderWidth: 1,
                      // borderColor: theme.palette.grey[400],
                      // borderStyle: 'solid',
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
                        cursor:
                          expanded === task.id ? 'default !important' : 'auto',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          width: '100%',
                          // backgroundColor:'red',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography
                          noWrap={expanded === task.id ? false : true}
                          // noWrap={true}
                          fontSize={19}
                          fontWeight={500}
                          sx={{
                            maxWidth: { xs: 200, sm: 370, md: 500, lg: 800 },
                            width: '100%',
                          }}
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
                        <Typography fontWeight={400}>
                          {task.description}
                        </Typography>

                        <CustomRow>
                          <FlagRounded color='success' fontSize='medium' />
                          <Typography fontWeight={500}>
                            {moment(task.dueDate).format('MMM Do, YYYY')}
                          </Typography>
                        </CustomRow>

                        <CustomRow>
                          <GroupsRounded color='info' fontSize='medium'/>
                          <Typography fontWeight={500}>
                            {
                              teamsData.find(team => team.id == task.parent)
                                ?.name
                            }
                          </Typography>
                        </CustomRow>

                        <CustomRow>
                          <Avatar
                            src={
                              membersData.find(
                                member => member.uid == task.assignedTo
                              )?.profilePic
                            }
                            sx={{ width: 24, height: 24 }}
                          />
                          <Typography fontWeight={500}>
                            {
                              membersData.find(
                                member => member.uid == task.assignedTo
                              )?.userName
                            }
                          </Typography>
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
            })
          )}
        </Box>
        <Button
          variant='contained'
          onClick={handleOpenCreateModal}
          sx={{ alignSelf: 'flex-end' }}
        >
          ADD TASK
        </Button>
      </Container>


      <TaskForm
        taskEdit={taskEdit}
        open={taskFormModal}
        handleClose={handleCloseFormModal}
      />

      <TaskDelModal
        open={taskDelModal}
        taskEdit={taskEdit}
        handleClose={handleCloseDelModal}
      />
    </>
  )
}

export default TaskList
