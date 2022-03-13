import { AlertColor, Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import React from 'react'
import { useAlertCtx } from '../context/AlertCtx'

const AlertCustom = (props: {}) => {
  const {
    alertMsg,
    setAlertMsg,
    alertType,
    setAlertType,
    alertOpen,
    setAlertOpen,
  } = useAlertCtx()

  const alertHide = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={alertOpen}
      onClose={alertHide}
      autoHideDuration={5000}
    >
      <Alert onClose={alertHide} severity={alertType}>
        {alertMsg}
      </Alert>
    </Snackbar>
  )
}

export default AlertCustom
