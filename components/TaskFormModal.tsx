import { useEffect, useState } from 'react'
import {
  Box,
  Modal,
  Button,
  // Typography,
  TextField,
  // FormControl,
  Autocomplete,
  TextFieldProps,
  AlertColor,
} from '@mui/material'
import {
  ITask,
  ITeamWithId,
  IUser,
  taskDefault,
  TaskWithId,
} from '../util/types'
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material'

import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import moment from 'moment'
import { useAlertCtx } from '../context/AlertCtx'
import { createTask, editTask } from '../firebase/task'
import { useAuthCtx } from '../context/AuthCtx'
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/config'

interface ITaskFormModalProps {
  taskEdit: TaskWithId | null
  open: boolean
  handleClose: (e: React.SyntheticEvent, reason?: string) => void
}

const TaskForm = ({
  taskEdit,
  open,
  handleClose,
}: ITaskFormModalProps) => {
  const [taskTemp, setTaskTemp] = useState<TaskWithId | ITask | null>(null)
  const [errors, setErrors] = useState<Record<string, string | null> | null>(
    null
  )
  const [userData, setUserData] = useState<Partial<IUser>>({})
  const [teamsData, setTeamsData] = useState<Partial<ITeamWithId>[]>([])
  const [membersData, setMembersData] = useState<Partial<IUser>[]>([])
  const { alertShow } = useAlertCtx()
  const { user } = useAuthCtx()

  useEffect(() => {
    if (!user) return

    if (!taskEdit) {
      setTaskTemp({ ...taskDefault, createdBy: user?.uid })
    } else {
      setTaskTemp(taskEdit)
    }
    const userCollectionRef = collection(db, 'users')
    const qUser = query(userCollectionRef, where(documentId(), '==', user.uid))
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      querySnapshot.forEach(doc => {
        setUserData({
          uid: doc.data().uid,
          teams: doc.data().teams,
        })
      })
    })
    return unsubscribe
  }, [user, taskEdit])

  // // Capture taskEdit, which will be different for each task for which
  // // we press the Edit button since the props will be different
  // // It is bad practice to initialize state with values passed from props since
  // // if the value changes in the parent component for whatever reason, the child
  // // would be using out-of-date values
  // //
  // // Additionally, by implementing the task that is being edited both in parent
  // // component and child, we can have the app remember the task we were editing
  // // even if we close the Modal and changes will be there if we reopen the same
  // // task to edit
  // useEffect(() => {
  //   if (!taskEdit) {
  //     setTaskTemp({ ...taskDefault, createdBy: user?.uid })
  //   } else {
  //     setTaskTemp(taskEdit)
  //   }
  // }, [taskEdit])

  useEffect(() => {
    if (!userData || !userData.teams || userData.teams.length == 0) return
    const teamsCollectionRef = collection(db, 'teams')
    const qTeams = query(
      teamsCollectionRef,
      where(documentId(), 'in', userData.teams)
    )
    const unsubscribe = onSnapshot(qTeams, querySnapshot => {
      setTeamsData(
        querySnapshot.docs.map<Partial<ITeamWithId>>(doc => ({
          ...doc.data(),
          id: doc.id,
          name: doc.data().name,
          members: doc.data().members,
        }))
      )
    })
    return unsubscribe
  }, [userData])

  useEffect(() => {
    if (!teamsData) return
    const members: string[] = []
    teamsData.map(team => {
      if (team.members) members.push(...team.members)
    })
    if (members.length == 0) return
    const membersCollectionRef = collection(db, 'users')
    const qMembers = query(
      membersCollectionRef,
      where(documentId(), 'in', members)
    )
    const unsubscribe = onSnapshot(qMembers, querySnapshot => {
      setMembersData(
        querySnapshot.docs.map<Partial<IUser>>(doc => ({
          ...doc.data(),
          uid: doc.id,
          userName: doc.data().userName,
          email: doc.data().email,
          profilePic: doc.data().profilePic,
        }))
      )
    })
    return unsubscribe
  }, [teamsData])

  useEffect(() => {
    console.log(membersData)
  }, [membersData])

  const handleTextUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(taskTemp)
    if (!taskTemp) return
    setTaskTemp({ ...taskTemp, [e.target.id]: e.target.value })
  }

  const closeModal = (e: React.SyntheticEvent) => {
    setErrors(null)
    handleClose(e)
  }

  const handleAutoCompUpdate = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: string | undefined | null,
    property: keyof ITask
  ) => {
    if (!taskTemp) return
    setTaskTemp({ ...taskTemp, [property]: newValue })
  }

  const handleDateUpdate = (newDate: Date | null) => {
    if (!taskTemp || !newDate) return
    setTaskTemp({ ...taskTemp, dueDate: Number(moment(newDate).format('x')) })
  }

  const errorCheck = () => {
    // if (!taskTemp?.assignedTo)
    // setTaskTemp({ ...taskTemp, assignedTo: user?.uid })
    const temp: Record<string, string | null> = {
      title: taskTemp?.title ? null : 'Must have Title',
      description: taskTemp?.description ? null : 'Must have description',
      // asignee: taskTemp?.assignedTo ? null : 'Must be assigned',
      dueDate: taskTemp?.dueDate ? null : 'Must assign due date',
      // parent: taskTemp?.parent ? null : 'Must form part of a project',
    }
    setErrors({ ...temp })
    return Object.values(temp).every(v => v === null)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!errorCheck() || !taskTemp || !user) return
    if (!taskEdit) {
      const submitRes = await createTask(taskTemp, user.uid).then(r => r)
      alertShow(
        `Todo id:${submitRes?.taskDocRef.id}, named: ${
          submitRes?.taskData.title
        } created at ${Date.now()} successfully`,
        'success'
      )
    } else if (taskEdit === taskTemp) {
      return
    } else {
      const submitRes = await editTask({ id: taskEdit.id, ...taskTemp }).then(
        r => r
      )
      alertShow(
        `Todo id:${submitRes?.taskDocRef.id}, named: ${
          submitRes?.taskData.title
        } edited at ${Date.now()} successfully`,
        'info'
      )
    }
    handleClose(e)
    setTaskTemp(null)
  }

  const requiredTextProps: TextFieldProps = {
    variant: 'outlined',
    size: 'small',
    fullWidth: true,
    required: true,
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='child-modal-title'
      aria-describedby='child-modal-description'
    >
      <Box
        component='form'
        noValidate
        onSubmit={handleSubmit}
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <TextField
            {...requiredTextProps}
            id='title'
            label='Title'
            error={Boolean(errors?.title)}
            value={taskTemp?.title}
            onChange={handleTextUpdate}
            inputProps={{ maxLength: 100 }}
            helperText={errors?.title}
            // helperText={`Characters left: ${
            //   100 - (taskTemp?.title ? taskTemp.title.length : 0)
            // }`}
          />

          <TextField
            id='description'
            error={Boolean(errors?.description)}
            helperText={errors?.description}
            label='description'
            fullWidth
            required
            multiline
            maxRows={5}
            minRows={3}
            value={taskTemp?.description}
            onChange={handleTextUpdate}
          />

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
          </LocalizationProvider>

          <Autocomplete
            id='parent'
            fullWidth
            size='small'
            options={teamsData.map(t => t.id)}
            getOptionLabel={option => {
              const team = teamsData.find(t => t.id === option)
              return team?.name ? team.name : ''
            }}
            value={taskTemp?.parent}
            onChange={(e, newValue) =>
              handleAutoCompUpdate(e, newValue, 'parent')
            }
            renderInput={(params: any) => (
              <TextField
                {...params}
                value={taskTemp?.parent}
                error={Boolean(errors?.parent)}
                helperText={errors?.parent}
                label='Parent Project'
                variant='outlined'
                size='small'
              />
            )}
          />

          <Autocomplete
            id='assignedTo'
            // freeSolo
            disabled={taskTemp?.parent ? false : true}
            value={taskTemp?.assignedTo}
            options={membersData.map(m => m.uid)}
            getOptionLabel={option => {
              const member = membersData.find(m => m.uid === option)
              return member?.userName ? member.userName : ''
            }}
            onChange={(e, newValue) =>
              handleAutoCompUpdate(e, newValue, 'assignedTo')
            }
            renderInput={(params: any) => (
              <TextField
                {...params}
                value={taskTemp?.assignedTo}
                error={Boolean(errors?.asignee)}
                helperText={errors?.asignee}
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
            onClick={closeModal}
            startIcon={<CancelRounded />}
          >
            Discard
          </Button>
          <Button
            color='primary'
            type='submit'
            variant='contained'
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
