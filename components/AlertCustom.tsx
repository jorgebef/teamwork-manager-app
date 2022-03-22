import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import React from 'react'
import { useAlertCtx } from '../context/AlertCtx'

const AlertCustom = () => {
  const { alertMsg, alertType, alertOpen, alertHide } = useAlertCtx()

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
