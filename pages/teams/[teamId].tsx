import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import TaskList from '../../components/TaskList'
import { useTeamTasks } from '../../hooks/tasks'

const TeamId: NextPage = () => {
  // const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const teamId = router.query.teamId as string | undefined
  const tasksfromTeam = useTeamTasks(teamId)

  // useEffect(() => {
  //   tasksfromTeam && setLoading(false)
  // }, [tasksfromTeam])

  // _________________________________
  // INFINITE LOOP
  // _________________________________
  // const taskData = useTaskArr([
  //   ...(userData.createdTasks ? userData.createdTasks : []),
  //   ...(userData.assignedTasks ? userData.assignedTasks : []),
  // ])
  // const taskData: TaskWithId[] = useTaskArr(tasksfromTeam)
  // _________________________________

  return !tasksfromTeam ? (
    <Typography>LOADING ...</Typography>
  ) : (
    <TaskList tasks={tasksfromTeam} />
  )
}

export default TeamId
