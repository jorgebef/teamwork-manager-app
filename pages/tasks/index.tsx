import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'
import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { useUserTasks } from '../../hooks/tasks'

const Tasks: NextPage = () => {
  const { user } = useAuthCtx()
  const tasks = useUserTasks(user?.uid!)


  return !tasks ? (
    <Typography>LOADING ...</Typography>
  ) : (
    <TaskList tasks={tasks} />
  )
}

export default Tasks
