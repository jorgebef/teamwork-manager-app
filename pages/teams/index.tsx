import { NextPage } from 'next'
import TeamList from '../../components/TeamList'
import { useAuthCtx } from '../../context/AuthCtx'
import { useUserTeams } from '../../hooks/teams'

const Teams: NextPage = () => {
  const { user } = useAuthCtx()
  const userTeams = useUserTeams(user?.uid)

  return userTeams && <TeamList teams={userTeams} />
}

export default Teams
