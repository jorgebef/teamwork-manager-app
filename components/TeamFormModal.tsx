import {
  Autocomplete,
  Box,
  Button,
  Card,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ITeam,  IUser, teamDefault } from '../util/types'
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { CancelRounded, CheckCircleRounded } from '@mui/icons-material'
import editTeam from '../firebase/editTeam'
import createTeam from '../firebase/createTeam'
import { useAuthCtx } from '../context/AuthCtx'
import { useAlertCtx } from '../context/AlertCtx'

interface ITeamFormModalProps {
  teamEdit: ITeam | null
  open: boolean
  onClose: (e: React.SyntheticEvent, reason?: string) => void
}

const TeamFormModal = ({ teamEdit, open, onClose }: ITeamFormModalProps) => {
  const [teamTemp, setTeamTemp] = useState<ITeam>({} as ITeam)
  const [usersData, setUsersData] = useState<Partial<IUser>[]>([])
  const { alertShow } = useAlertCtx()
  const { user } = useAuthCtx()

  useEffect(() => {
    if (!user) return

    if (!teamEdit)
      setTeamTemp({
        ...teamDefault,
        members: [user.uid],
      })
    else setTeamTemp(teamEdit)

    // if (!user) return
    const userCollectionRef = collection(db, 'users')
    const qUser = query(userCollectionRef)
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      setUsersData(
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
  }, [user, teamEdit])

  const handleTextUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!teamTemp) return
    setTeamTemp({ ...teamTemp, [e.target.id]: e.target.value })
  }

  const handleAutoCompUpdate = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: (string | undefined)[] | null,
    property: keyof ITeam
  ) => {
    if (!teamTemp) return
    setTeamTemp({ ...teamTemp, [property]: [...(newValue ? newValue : [])] })
  }

  const handleMembersUpdate = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: (string | undefined)[] | null,
    property: keyof ITeam
  ) => {
    if (!teamTemp || !newValue) return
    const valueArr: (string | undefined)[] = [...(newValue ? newValue : [])]
    const isThere: boolean = Boolean(newValue?.find(m => m === user?.uid))

    const newMembers: (string | undefined)[] = isThere
      ? [...valueArr]
      : [user?.uid, ...valueArr]
    setTeamTemp({ ...teamTemp, [property]: [...newMembers] })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!teamEdit) {
      const submitRes = await createTeam(teamTemp, user!.uid).then(r => r)
      alertShow(
        `Team ${submitRes?.teamData.name} created successfully with id ${submitRes.teamDocRef.id}`,
        'success'
      )
    } else if (teamEdit === teamTemp) {
      return
    } else {
      const submitRes = await editTeam({ id: teamEdit.id!, ...teamTemp }).then(
        r => r
      )
      alertShow(`Team ${submitRes?.teamData.name} edited successfully`, 'info')
    }

    onClose(e)
    setTeamTemp({} as ITeam)
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          component='form'
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            // minWidth: { xs: '80%', sm: '55%', md: '45%', lg: '35%' },
            width: { xs: '80%', sm: '55%', md: '45%', lg: '35%' },
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <TextField
            id='name'
            label='Team name'
            size='small'
            fullWidth
            required
            value={teamTemp?.name}
            onChange={handleTextUpdate}
          />

          <TextField
            id='description'
            label='Team description'
            size='small'
            multiline
            maxRows={4}
            minRows={2}
            fullWidth
            required
            value={teamTemp?.description}
            onChange={handleTextUpdate}
          />

          <Autocomplete
            id='members'
            limitTags={2}
            multiple
            disableCloseOnSelect
            // renderTags={() => null}
            // renderTags={o => o}
            value={teamTemp?.members}
            options={usersData.map(user => user.uid)}
            onChange={(e, newValue) =>
              handleMembersUpdate(e, newValue, 'members')
            }
            getOptionDisabled={option =>
              Boolean(teamTemp?.members.find(m => m === option))
            }
            getOptionLabel={option => {
              const user = usersData.find(u => u.uid === option)
              return user?.userName ? user.userName : ''
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                value={teamTemp?.members}
                label='Members'
                variant='outlined'
                size='small'
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button
              color='error'
              type='button'
              variant='contained'
              onClick={onClose}
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
    </>
  )
}

export default TeamFormModal
