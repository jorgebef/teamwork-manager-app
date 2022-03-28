import Typography from '@mui/material/Typography'
import { Box, Button, Container } from '@mui/material'
import TaskForm from './TaskFormModal'
import TaskDelModal from './TaskDelModal'
import { useAuthCtx } from '../context/AuthCtx'
import { IUser, ITask } from '../util/types'
import { useUser } from '../hooks/users'
import TaskAccordion from './TaskAccordion'
import { useActionsCtx } from '../context/ActionsCtx'

interface ITaskListProps {
  tasks: ITask[]
}

const TaskList = ({ tasks }: ITaskListProps) => {
  const {
    setExpanded,
    taskFormModal,
    setTaskFormModal,
    taskDelModal,
    setTaskDelModal,
    taskEdit,
    setTaskEdit,
  } = useActionsCtx()

  const { user } = useAuthCtx()

  const userData: IUser = useUser(user!.uid)

  const handleCloseFormModal = (e: React.SyntheticEvent, reason?: string) => {
    // Here we handle the case were we click on the backdrop
    // by having a conditional prop "reason", we can use this
    // function both in onClose and onClick
    if (reason === 'backdropClick') return
    setTaskFormModal(false)
  }

  const handleCloseDelModal = (e: React.SyntheticEvent) => {
    setTaskDelModal(false)
  }

  const handleOpenCreateModal = () => {
    setExpanded(false)
    setTaskEdit(null)
    setTaskFormModal(true)
  }

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {tasks?.length == 0 ? (
            <Typography>NO TASKS</Typography>
          ) : (
            tasks.map((task: ITask) => {
              return <TaskAccordion key={task.id} task={task} />
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
