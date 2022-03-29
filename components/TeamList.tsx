import { Box, Button, Container, Typography } from '@mui/material'
import { useActionsCtx } from '../context/ActionsCtx'
import { ITeam } from '../util/types'
import TeamCard from './TeamCard'
import TeamFormModal from './TeamFormModal'
import TeamLeaveModal from './TeamLeaveModal'

type TeamListProps = {
  teams: ITeam[]
}

const TeamList = ({ teams }: TeamListProps) => {
  // const [teamFormModal, setTeamFormModal] = useState<boolean>(false)
  // const [teamLeaveModal, setTeamLeaveModal] = useState<boolean>(false)
  // const [teamEdit, setTeamEdit] = useState<ITeam | null>(null)
  const {
    teamFormModal,
    setTeamFormModal,
    teamLeaveModal,
    setTeamLeaveModal,
    teamEdit,
    setTeamEdit,
  } = useActionsCtx()

  const handleOpenCreateModal = () => {
    setTeamEdit(null)
    setTeamFormModal(true)
  }

  const handleCloseFormModal = (e: React.SyntheticEvent, reason?: string) => {
    if (reason === 'backdropClick') return
    setTeamFormModal(false)
  }

  const handleCloseLeaveModal = (e: React.SyntheticEvent, reason?: string) => {
    setTeamLeaveModal(false)
  }

  return (
    <Container
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

      <TeamFormModal
        teamEdit={teamEdit}
        open={teamFormModal}
        onClose={handleCloseFormModal}
      />

      <TeamLeaveModal
        open={teamLeaveModal}
        teamEdit={teamEdit}
        handleClose={handleCloseLeaveModal}
      />
    </Container>
  )
}

export default TeamList
