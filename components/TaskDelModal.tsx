import { Box, Modal, Button, Typography } from '@mui/material'
import React from 'react'
import { ITask } from '../util/types'
import { deleteTask } from '../firebase/task'
import { useAlertCtx } from '../context/AlertCtx'
import { CancelRounded, DeleteRounded } from '@mui/icons-material'
import { useAuthCtx } from '../context/AuthCtx'
import { useTasksCtx } from '../context/TasksCtx'

const TaskDelModal = () => {
  const { alertShow } = useAlertCtx()
  const { user } = useAuthCtx()
  const { taskEdit, taskDelModal, handleCloseDelModal } = useTasksCtx()

  const handleDelete = async (task: ITask | null, e: React.SyntheticEvent) => {
    e.stopPropagation()
    if (!task || !user) return
    handleCloseDelModal(e)
    const deleteRes = await deleteTask(task.id!).then(r => r)
    // alert(`Delete ${docRef.id} successfully`)
    alertShow(`Successfully deleted task id ${deleteRes?.taskId} !!`, 'error')
  }

  return (
    <>
      <Modal open={taskDelModal} onClose={handleCloseDelModal}>
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
            Delete task:
            <br /> &quot;{taskEdit?.title}&quot; ?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              color='primary'
              type='button'
              variant='contained'
              onClick={handleCloseDelModal}
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
