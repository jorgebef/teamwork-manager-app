import { Box, Button, Typography } from '@mui/material'
import { useTeamsCtx } from '../context/TeamsCtx'
import { ITeam } from '../util/types'
import TeamCard from './TeamCard'
import TeamFormModal from './TeamFormModal'
import TeamLeaveModal from './TeamLeaveModal'

type TeamListProps = {
  teams: ITeam[]
}

const TeamList = ({ teams }: TeamListProps) => {
  const { handleOpenCreateModal } = useTeamsCtx()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {teams.length == 0 ? (
        <Typography>NO TEAMS</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {teams.map((team: ITeam) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </Box>
      )}
      <Button
        color='primary'
        variant='contained'
        sx={{ alignSelf: 'flex-end' }}
        onClick={handleOpenCreateModal}
      >
        Create Team
      </Button>

      <TeamFormModal />

      <TeamLeaveModal />
    </Box>
  )
}

export default TeamList
