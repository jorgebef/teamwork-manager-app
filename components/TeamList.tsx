import { Typography } from '@mui/material'
import {  ITeamWithId } from '../util/types'
import TeamCard from './TeamCard'

type TeamListProps = {
  teams: ITeamWithId[]
}

const TeamList = ({ teams }: TeamListProps) => {
  // const [teams, setTeams] = useState<ITeam[] | null>(null)
  // const { user } = useAuthCtx()

  return (
    <>
      {teams.length == 0 ? (
        <Typography>NO TEAMS</Typography>
      ) : (
        teams.map((team: ITeamWithId, i: number) => <TeamCard key={i} team={team} />)
      )}
    </>
  )
}

export default TeamList
