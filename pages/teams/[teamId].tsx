import { Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'
import useTaskArr from '../../hooks/useTaskArr'
import useTeamTasks from '../../hooks/useTeamTasks'
import useUser from '../../hooks/useUser'
import { TaskWithId } from '../../util/types'

const TeamId: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { user } = useAuthCtx()
  const teamId = router.query.teamId as string | undefined
  const userData = useUser(user?.uid)
  const tasksfromTeam: TaskWithId[]   = useTeamTasks(teamId)
  // _________________________________
  // INFINITE LOOP
  // _________________________________
  // const taskData = useTaskArr([
  //   ...(userData.createdTasks ? userData.createdTasks : []),
  //   ...(userData.assignedTasks ? userData.assignedTasks : []),
  // ])
  // const taskData: TaskWithId[] = useTaskArr(tasksfromTeam)
  // _________________________________

  return loading ? (
    <Typography>LOADING ...</Typography>
  ) : (
    <TaskList tasks={tasksfromTeam} />
  )
}

export default TeamId
