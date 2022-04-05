import Typography from '@mui/material/Typography'
import { Box, Button, Container, Divider } from '@mui/material'
import TaskForm from './TaskFormModal'
import TaskDelModal from './TaskDelModal'
import { ITask } from '../util/types'
import TaskAccordion from './TaskAccordion'
import { useActionsCtx } from '../context/ActionsCtx'
import { CheckRounded } from '@mui/icons-material'
import TaskFilter from './TaskFilter'
import { useEffect, useState } from 'react'

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

  const [teamFilter, setTeamFilter] = useState<string[]>([])
  const [displayTasks, setDisplayTasks] = useState<ITask[] | null>(null)
  const [compTasks, setCompTasks] = useState<ITask[]>([] as ITask[])
  const [incompTasks, setIncompTasks] = useState<ITask[]>([] as ITask[])

  useEffect(() => {
    const filteredTasks =
      teamFilter.length !== 0
        ? tasks.filter(task => teamFilter.includes(task.parent))
        : tasks
    setDisplayTasks(filteredTasks)
  }, [tasks, teamFilter])

  useEffect(() => {
    console.log(displayTasks)
    const compTasks: ITask[] = [] as ITask[]
    const incompTasks: ITask[] = [] as ITask[]
    displayTasks?.map(t =>
      t.completed ? compTasks.push(t) : incompTasks.push(t)
    )
    setCompTasks(compTasks)
    setIncompTasks(incompTasks)
  }, [displayTasks])

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
          <TaskFilter
            tasks={tasks}
            teamFilter={teamFilter}
            setTeamFilter={setTeamFilter}
          />
          {displayTasks?.length == 0 && <Typography>NO TASKS</Typography>}
          {incompTasks.map((task: ITask) => {
            return (
              !task.completed && <TaskAccordion key={task.id} task={task} />
            )
          })}
          {compTasks.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box
                color={t => t.palette.text.secondary}
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              >
                <CheckRounded />
                <Typography variant='h6'>Completed Tasks</Typography>
              </Box>
              {compTasks.map((task: ITask) => {
                return (
                  task.completed && <TaskAccordion key={task.id} task={task} />
                )
              })}
            </>
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
