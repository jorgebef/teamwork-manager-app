import { EditRounded, ExitToAppRounded } from '@mui/icons-material'
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Container,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import { ITeam, IUser } from '../util/types'
import { useTeamUsers, useUser } from '../hooks/users'
import { useAuthCtx } from '../context/AuthCtx'
import { useTeamsCtx } from '../context/TeamsCtx'

interface TeamCardProps {
  team: ITeam
}

const TeamCard = ({ team }: TeamCardProps) => {
  const { handleOpenLeaveModal, handleOpenEditModal } = useTeamsCtx()
  const theme = useTheme()
  const members = useTeamUsers(team.id)
  const { user } = useAuthCtx()
  const userData: IUser = useUser(user!.uid)

  return (
    <Card
      // elevation={0}
      key={team.id}
      variant='outlined'
      sx={{
        p: 3,
        transitionProperty: 'all',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Typography noWrap maxWidth='100%' variant='h6'>
          {team.name}
        </Typography>
        <AvatarGroup sx={{ ml: 2 }} total={team.members.length}>
          {team.members.slice(0, 2).map((uid: string) => (
            <Avatar
              key={uid}
              alt={members?.find(m => m.uid === uid)?.userName}
              src={members?.find(m => m.uid === uid)?.profilePic}
            />
          ))}
        </AvatarGroup>
      </Container>
      <Divider sx={{ mt: 1, mb: 2 }} />
      <Container sx={{ display: 'flex' }}>
        <Typography variant='body1'>{team.description}</Typography>
      </Container>
      <Container
        sx={{
          display: 'flex',
          mt: 3,
          gap: 1,
          justifyContent: 'flex-start',
        }}
      >
        {team.admins.find(x => x === userData.uid) && (
          <Button
            color='primary'
            variant='contained'
            size='small'
            onClick={() => handleOpenEditModal(team)}
            startIcon={<EditRounded />}
          >
            Edit
          </Button>
        )}
        <Button
          color='error'
          variant='contained'
          size='small'
          onClick={() => handleOpenLeaveModal(team)}
          startIcon={<ExitToAppRounded />}
        >
          Leave
        </Button>
      </Container>
    </Card>
  )
}

export default TeamCard
