import { useEffect, useState } from 'react'
import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'
import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { useUserTasks } from '../../hooks/tasks'

const Tasks: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAuthCtx()
  const tasks = useUserTasks(user!.uid)

  useEffect(() => {
    tasks && setLoading(false)
  }, [tasks])

  return loading ? (
    <Typography>LOADING ...</Typography>
  ) : (
    <TaskList tasks={tasks} />
  )
}

export default Tasks
