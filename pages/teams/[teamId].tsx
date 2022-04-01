import { NextPage } from 'next'
import { useRouter } from 'next/router'
import TaskList from '../../components/TaskList'
import { useTeamTasks } from '../../hooks/tasks'

const TeamId: NextPage = () => {
  const router = useRouter()
  const teamId = router.query.teamId as string | undefined
  const tasksfromTeam = useTeamTasks(teamId)

  return tasksfromTeam && <TaskList tasks={tasksfromTeam} />
}

export default TeamId
