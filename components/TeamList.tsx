import { EditRounded, ExitToAppRounded } from '@mui/icons-material'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthCtx } from '../context/AuthCtx'
import { db } from '../firebase/config'
import { ITeam, ITeamWithId, IUser } from '../util/types'
import TeamFormModal from './TeamFormModal'
import TeamLeaveModal from './TeamLeaveModal'

type TeamListProps = {
  teams: ITeamWithId[]
}

const TeamList = ({ teams }: TeamListProps) => {
  const [memberList, setMemberList] = useState<string[] | null>(null)
  const [members, setMembers] = useState<Partial<IUser>[] | null>(null)
  const [openFormModal, setOpenFormModal] = useState<boolean>(false)
  const [openLeaveModal, setOpenLeaveModal] = useState<boolean>(false)
  const [teamEdit, setTeamEdit] = useState<ITeamWithId | null>(null)
  const theme = useTheme()

  useEffect(() => {
    const totalMembers: string[] = []
    teams.map(team => {
      team.members.map(member => {
        totalMembers.push(member)
      })
    })
    setMemberList(totalMembers)
  }, [teams])

  useEffect(() => {
    if (!memberList || memberList.length == 0) return
    // console.log(memberList)

    // const prevMembers: Partial<IUser>[] = []

    // members?.map((member:Partial<IUser>)=>{
    //   console.log(`Member Data: ${member}`)
    // })

    const userCollectionRef = collection(db, 'users')
    // const q = query(userCollectionRef, where(documentId(), 'in', memberList))
    const q = query(userCollectionRef, where(documentId(), 'in', memberList))
    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      setMembers(
        QuerySnapshot.docs.map<Partial<IUser>>(doc => ({
          ...doc.data(),
          uid: doc.data().uid,
          userName: doc.data().userName,
          profilePic: doc.data().profilePic,
        }))
      )
      // setLoading(false)
      // prevMembers.push()
    })
    return unsubscribe

    // setMembers([...prevMembers, fetchUser(uid)])
  }, [memberList])

  useEffect(() => {
    console.log('MEMBERS')
    console.log(members?.map(m => m.userName))
  }, [members])

  const handleOpenEditModal = (team: ITeamWithId) => {
    setTeamEdit(team)
    setOpenFormModal(true)
  }

  const handleOpenCreateModal = () => {
    setTeamEdit(null)
    setOpenFormModal(true)
  }

  const handleCloseFormModal = (e: React.SyntheticEvent, reason?: string) => {
    if (reason === 'backdropClick') return
    setOpenFormModal(false)
  }

  const handleOpenLeaveModal = (team: ITeamWithId) => {
    setTeamEdit(team)
    setOpenLeaveModal(true)
  }

  const handleCloseLeaveModal = (e: React.SyntheticEvent, reason?: string) => {
    setOpenLeaveModal(false)
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {teams.length == 0 ? (
        <Typography>NO TEAMS</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {teams.map((team: ITeamWithId) => (
            <Card
              // elevation={0}
              key={team.id}
              variant='outlined'
              sx={{
                p: 3,
                transitionProperty: 'all',
                transitionDuration: theme.transitions.duration.short,
                transitionTimingFunction: theme.transitions.easing.easeInOut,
                // borderRadius: t => t.shape.borderRadius,
              }}
            >
              <Container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // width: '100%',
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <Typography noWrap maxWidth='100%' variant='h4'>
                  {team.name}
                </Typography>
                <AvatarGroup total={team.members.length}>
                  {team.members.slice(0, 2).map((uid: string) => (
                    <Avatar
                      key={uid}
                      alt={members?.find(m => m.uid === uid)?.userName}
                      src={members?.find(m => m.uid === uid)?.profilePic}
                    />
                  ))}
                </AvatarGroup>
              </Container>
              <Divider sx={{ mt: 1, mb: 2 }} />
              <Container sx={{ display: 'flex' }}>
                <Typography variant='body1'>{team.description}</Typography>
              </Container>
              <Container
                sx={{
                  display: 'flex',
                  mt: 3,
                  gap: 1,
                  justifyContent: 'flex-start',
                }}
              >
                <Button
                  color='primary'
                  variant='contained'
                  size='small'
                  onClick={() => handleOpenEditModal(team)}
                  startIcon={<EditRounded />}
                >
                  Edit
                </Button>
                <Button
                  color='error'
                  variant='contained'
                  size='small'
                  onClick={() => handleOpenLeaveModal(team)}
                  startIcon={<ExitToAppRounded />}
                >
                  Leave
                </Button>
              </Container>
            </Card>
          ))}
        </Box>
      )}
      <Button
        color='primary'
        variant='contained'
        sx={{ alignSelf: 'flex-end' }}
        onClick={handleOpenCreateModal}
      >
        Create Team
      </Button>

      <TeamFormModal
        teamEdit={teamEdit}
        open={openFormModal}
        onClose={handleCloseFormModal}
      />

      <TeamLeaveModal
        open={openLeaveModal}
        teamEdit={teamEdit}
        handleClose={handleCloseLeaveModal}
      />
    </Container>
  )
}

export default TeamList
