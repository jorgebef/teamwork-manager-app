import { Box, Modal, Button, Typography } from '@mui/material'
import React from 'react'
import { ITask } from '../util/types'
import { deleteTask } from '../firebase/task'
import { useAlertCtx } from '../context/AlertCtx'
import { CancelRounded, DeleteRounded } from '@mui/icons-material'
import { useAuthCtx } from '../context/AuthCtx'

interface ITaskDelModalProps {
  open: boolean
  taskEdit: ITask | null
  handleClose: (e: React.SyntheticEvent, reason?: string) => void
}

const TaskDelModal = ({ open, taskEdit, handleClose }: ITaskDelModalProps) => {
  const { alertShow } = useAlertCtx()
  const { user } = useAuthCtx()

  const handleDelete = async (task: ITask | null, e: React.SyntheticEvent) => {
    e.stopPropagation()
    if (!task || !user) return
    handleClose(e)
    const deleteRes = await deleteTask(task.id!).then(r => r)
    // alert(`Delete ${docRef.id} successfully`)
    alertShow(`Successfully deleted task id ${deleteRes?.taskId} !!`, 'error')
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
            Delete {taskEdit?.title}
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
              startIcon={<DeleteRounded />}
              onClick={e => handleDelete(taskEdit, e)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default TaskDelModal
