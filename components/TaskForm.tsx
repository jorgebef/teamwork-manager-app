import { useEffect, useState } from 'react'
import {
  Box,
  Modal,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
} from '@mui/material'
import { ITask } from '../util/types'
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material'
import { display } from '@mui/system'

import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'

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
  taskEdit: ITask | null
  open: boolean
  handleClose: (e: React.SyntheticEvent, reason?: string) => void
}

const TaskForm = ({ taskEdit, open, handleClose }: ITaskProps) => {
  const [taskTemp, setTaskTemp] = useState<ITask | null>(null)

  // Capture taskEdit, which will be different for each task for which
  // we press the Edit button since the props will be different
  // It is bad practice to initialize state with values passed from props since
  // if the value changes in the parent component for whatever reason, the child
  // would be using out-of-date values
  //
  // Additionally, by implementing the task that is being edited both in parent
  // component and child, we can have the app remember the task we were editing
  // even if we close the Modal and changes will be there if we reopen the same
  // task to edit
  useEffect(() => {
    setTaskTemp(taskEdit)
  }, [taskEdit])

  useEffect(() => {
    console.log(taskTemp)
  }, [taskTemp])

  const handleTextUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!taskTemp) return
    setTaskTemp({ ...taskTemp, [e.target.id]: e.target.value })
  }

  const handleDateUpdate = (newDate: Date | null) => {
    if (!taskTemp || !newDate) return
    setTaskTemp({ ...taskTemp, dueDate: newDate })
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
          minWidth: { xs: '85%', md: '60%' },
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <TextField
            // key='title'
            id='title'
            variant='outlined'
            size='small'
            label='Title'
            fullWidth
            required
            value={taskTemp?.title}
            onChange={handleTextUpdate}
          />
          <TextField
            id='description'
            label='description'
            fullWidth
            required
            multiline
            maxRows={5}
            minRows={3}
            value={taskTemp?.description}
            onChange={handleTextUpdate}
          />
          <Box
            sx={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}
          >
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                disablePast
                label='Due date'
                openTo='day'
                views={['year', 'month', 'day']}
                value={taskTemp?.dueDate}
                onChange={handleDateUpdate}
                inputFormat='DD/MM/YYYY'
                renderInput={params => <TextField {...params} />}
              />
              <DatePicker
                disablePast
                label='Due date'
                openTo='day'
                views={['year', 'month', 'day']}
                value={taskTemp?.dueDate}
                onChange={() => null}
                inputFormat='DD/MM/YYYY'
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button
            color='error'
            type='button'
            variant='contained'
            onClick={handleClose}
            startIcon={<CancelRounded />}
          >
            Discard
          </Button>
          <Button
            color='primary'
            type='button'
            variant='contained'
            // onClick={handleSubmit}
            startIcon={<CheckCircleRounded />}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default TaskForm
