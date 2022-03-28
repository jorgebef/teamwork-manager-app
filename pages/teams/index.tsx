import { Typography } from '@mui/material'
import { NextPage } from 'next'
import TeamList from '../../components/TeamList'
import { useAuthCtx } from '../../context/AuthCtx'
import { useUserTeams } from '../../hooks/teams'

const Teams: NextPage = () => {
  const { user } = useAuthCtx()
  const teams = useUserTeams(user!.uid)

  return (
    <>
      {!teams ? (
        <Typography>LOADING...</Typography>
      ) : (
        <TeamList teams={teams} />
      )}
    </>
  )
}

export default Teams
