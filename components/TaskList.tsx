import Typography from '@mui/material/Typography'
import { Box, Button, Container, Divider } from '@mui/material'
import TaskFormModal from './TaskFormModal'
import TaskDelModal from './TaskDelModal'
import { ITask } from '../util/types'
import TaskAccordion from './TaskAccordion'
import { useTasksCtx } from '../context/TasksCtx'
import { CheckRounded } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useFilterCtx } from '../context/FilterCtx'

interface ITaskListProps {
  tasks: ITask[]
}

const TaskList = ({ tasks }: ITaskListProps) => {
  const { taskDelModal, taskEdit, handleOpenCreateModal } = useTasksCtx()

  const [compTasks, setCompTasks] = useState<ITask[]>([] as ITask[])
  const [incompTasks, setIncompTasks] = useState<ITask[]>([] as ITask[])
  const [displayTasks, setDisplayTasks] = useState<ITask[] | null>(null)
  const { teamFilter } = useFilterCtx()

  useEffect(() => {
    const filteredTasks =
      teamFilter?.length !== 0
        ? tasks.filter(task => teamFilter.includes(task.parent))
        : tasks
    setDisplayTasks(filteredTasks)
  }, [tasks, teamFilter, setDisplayTasks])

  useEffect(() => {
    const compTasks: ITask[] = [] as ITask[]
    const incompTasks: ITask[] = [] as ITask[]
    displayTasks?.map(t =>
      t.completed ? compTasks.push(t) : incompTasks.push(t)
    )
    setCompTasks(compTasks)
    setIncompTasks(incompTasks)
  }, [displayTasks])

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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

      <TaskFormModal />

      <TaskDelModal />
    </>
  )
}

export default TaskList
