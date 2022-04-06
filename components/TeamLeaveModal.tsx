import { Box, Modal, Button, Typography } from '@mui/material'
import React from 'react'
import { ITeam } from '../util/types'
import { useAlertCtx } from '../context/AlertCtx'
import { CancelRounded, ExitToAppRounded } from '@mui/icons-material'
import { useAuthCtx } from '../context/AuthCtx'
import leaveTeam from '../firebase/leaveTeam'
import { useTeamsCtx } from '../context/TeamsCtx'

const TeamLeaveModal = () => {
  const { alertShow } = useAlertCtx()
  const { user } = useAuthCtx()
  const { teamEdit, teamLeaveModal, handleCloseLeaveModal } = useTeamsCtx()

  const handleLeaveTeam = async (
    team: ITeam | null,
    e: React.SyntheticEvent
  ) => {
    e.stopPropagation()
    if (!team || !user) return
    handleCloseLeaveModal(e)
    const deleteRes = await leaveTeam(team, user.uid).then(r => r)
    alertShow(`Successfully left Team ${deleteRes?.teamData.name} !!`, 'error')
  }

  return (
    <>
      <Modal open={teamLeaveModal} onClose={handleCloseLeaveModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            minWidth: { xs: '80%', sm: '55%', md: '45%', lg: '35%' },
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <Typography textAlign='center' variant='h6'>
            Leave {teamEdit?.name}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              color='primary'
              type='button'
              variant='contained'
              onClick={handleCloseLeaveModal}
              startIcon={<CancelRounded />}
            >
              Cancel
            </Button>
            <Button
              color='error'
              variant='contained'
              startIcon={<ExitToAppRounded />}
              onClick={e => handleLeaveTeam(teamEdit, e)}
            >
              Leave team
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default TeamLeaveModal
