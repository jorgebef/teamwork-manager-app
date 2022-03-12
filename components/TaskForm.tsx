import { useEffect, useState } from 'react'
import {
  Box,
  Modal,
  Button,
  Typography,
  TextField,
  FormControl,
  Autocomplete,
  TextFieldProps,
  Snackbar,
  Alert,
} from '@mui/material'
import { ITask } from '../util/types'
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material'

import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../util/firebase'
import moment from 'moment'

interface ITaskProps {
  taskEdit?: ITask | null
  open: boolean
  handleClose: (e: React.SyntheticEvent, reason?: string) => void
}

const TaskForm = ({ taskEdit, open, handleClose }: ITaskProps) => {
  const [taskTemp, setTaskTemp] = useState<ITask | null>(null)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<string>('success')
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

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
    if (!taskEdit) return
    setTaskTemp(taskEdit)
  }, [taskEdit])

  const handleTextUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!taskTemp) return
    setTaskTemp({ ...taskTemp, [e.target.id]: e.target.value })
  }

  const handleDateUpdate = (newDate: Date | null) => {
    if (!taskTemp || !newDate) return
    // console.log(moment(newDate).format('DD MMMM YYYY'))
    // console.log(moment(newDate).format('x'))
    // console.log(taskTemp.createdAt)
    setTaskTemp({ ...taskTemp, dueDate: Number(moment(newDate).format('x')) })
  }

  const submitCreateTask = async (e: React.SyntheticEvent) => {
    if (!taskTemp) return
    // handleClose(e)
    const collectionRef = collection(db, 'tasks')
    const newTask: ITask = {
      ...taskTemp,
      createdAt: serverTimestamp(),
      modifiedAt: serverTimestamp(),
    }
    const docRef = await addDoc(collectionRef, newTask)
    alert(`Todo widh ref ${docRef.id} created at ${Date.now()} successfully`)
    setTaskTemp(null)
  }

  const requiredTextProps: TextFieldProps = {
    variant: 'outlined',
    size: 'small',
    fullWidth: true,
    required: true,
  }

  return (
    <>
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
            minWidth: { xs: '85%', md: '50%' },
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <Box
            component='form'
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}
            noValidate
          >
            <FormControl>
              <TextField
                // key='title'
                {...requiredTextProps}
                id='title'
                // variant='outlined'
                // size='small'
                label='Title'
                // fullWidth
                // required
                value={taskTemp?.title}
                onChange={handleTextUpdate}
              />
            </FormControl>
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
            <Autocomplete
              id='asignee'
              disableCloseOnSelect
              freeSolo
              options={[taskTemp?.title, 'Test2', 'Test3', 'Test 4']}
              // getOptionLabel= (option: FilmOptionType) => option.title,
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  value={taskTemp?.asignee}
                  onChange={handleTextUpdate}
                  label='Asignee'
                  variant='outlined'
                  size='small'
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              color='error'
              type='button'
              variant='contained'
              onClick={handleClose}
              // onClick={()=>setAlertOpen(true)}
              startIcon={<CancelRounded />}
            >
              Discard
            </Button>
            <Button
              color='primary'
              type='button'
              variant='contained'
              onClick={submitCreateTask}
              startIcon={<CheckCircleRounded />}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar open={alertOpen} autoHideDuration={1000}>
        <Alert>SUCCESS</Alert>
      </Snackbar>
    </>
  )
}

export default TaskForm
