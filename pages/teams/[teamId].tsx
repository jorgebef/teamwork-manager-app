import { Container, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'
import { useTeamTasks } from '../../hooks/tasks'
import { useUser } from '../../hooks/users'

const TeamId: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { user } = useAuthCtx()
  const teamId = router.query.teamId as string | undefined
  const userData = useUser(user!.uid)
  const tasksfromTeam = useTeamTasks(teamId)

  useEffect(() => {
    tasksfromTeam && setLoading(false)
  }, [tasksfromTeam])
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
    <TaskList tasks={tasksfromTeam} teamId={teamId} />
  )
}

export default TeamId
