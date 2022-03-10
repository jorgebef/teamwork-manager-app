import { useState } from 'react'
import { Box, Modal, Button, Typography } from '@mui/material'
import { ITask } from '../util/types'
import { EditRounded } from '@mui/icons-material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  // boxShadow: 24,
  p: 4,
}

interface ITaskProps {
  task: ITask
  open: boolean
  setOpen: (o: boolean) => void
}

const TaskForm = ({ task, open, setOpen }: ITaskProps) => {
  // const handleClose = () => {
  //   setOpen(false)
  // }

  const handleClose = (e: React.SyntheticEvent, reason?: string) => {
    // Here we handle the case were we click on the backdrop
    // by having a conditional prop "reason", we can use this
    // function both in onClose and onClick
    if (reason === 'backdropClick') return
    setOpen(false)
  }

  return (
      <Modal
        // hideBackdrop
        open={open}
        onClose={handleClose}
        // onBackdropClick={()=>null}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <Typography>{task.title}</Typography>
          <p id='child-modal-description'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
  )
}

export default TaskForm
