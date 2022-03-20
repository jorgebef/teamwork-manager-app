import {
  Box,
  Modal,
  Button,
  AlertColor,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import { ITeamWithId, TaskWithId } from '../util/types'
import { deleteTask } from '../firebase/task'
import { useAlertCtx } from '../context/AlertCtx'
import { CancelRounded, DeleteRounded, ExitToAppRounded } from '@mui/icons-material'
import { useAuthCtx } from '../context/AuthCtx'
import { leaveTeam } from '../firebase/teams'

interface TeamLeaveModalProps {
  open: boolean
  teamEdit: ITeamWithId | null
  handleClose: (e: React.SyntheticEvent, reason?: string) => void
}

const TeamLeaveModal = ({
  open,
  teamEdit,
  handleClose,
}: TeamLeaveModalProps) => {
  const { alertShow } = useAlertCtx()
  const { user } = useAuthCtx()

  const handleLeaveTeam = async (
    team: ITeamWithId | null,
    e: React.SyntheticEvent
  ) => {
    e.stopPropagation()
    if (!team || !user) return
    handleClose(e)
    const deleteRes = await leaveTeam(team, user.uid).then(r => r)
    // alert(`Delete ${docRef.id} successfully`)
    alertShow(`Successfully left Team ${deleteRes?.teamData.name} !!`, 'error')
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
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
              onClick={handleClose}
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
