import { Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'
import useTaskArr from '../../hooks/useTaskArr'
import useUser from '../../hooks/useUser'

const TeamId: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { user } = useAuthCtx()
  const { teamId } = router.query
  const userData = useUser(user?.uid)
  const taskData = useTaskArr([
    ...(userData.createdTasks ? userData.createdTasks : []),
    ...(userData.assignedTasks ? userData.assignedTasks : []),
  ])

  return loading ? (
    <Typography>LOADING ...</Typography>
  ) : (
    <TaskList tasks={taskData} />
  )
}

export default TeamId
