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
  doc,
  documentId,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthCtx } from '../context/AuthCtx'
import { db } from '../firebase/config'
import { fetchUser } from '../firebase/users'
import profile1 from '../public/profile1.jpg'
import profile2 from '../public/profile2.jpg'
import profile3 from '../public/profile3.jpg'
import { ITeam, ITeamWithId, IUser } from '../util/types'

type TeamCardProps = {
  team: ITeamWithId
}

const TeamCard = ({ team }: TeamCardProps) => {
  const [memberList, setMemberList] = useState<string[] | null>(null)
  const [members, setMembers] = useState<Partial<IUser>[] | null>(null)
  const theme = useTheme()

  useEffect(() => {
    setMemberList(team.members.slice(0,2))
  }, [team])

  useEffect(() => {
    if (!memberList || memberList.length == 0) return
    console.log(memberList)

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
          profilePic: doc.data().profilePic,
        }))
      )
      // setLoading(false)
      // prevMembers.push()
    })
    return unsubscribe

    // setMembers([...prevMembers, fetchUser(uid)])
  }, [memberList])

  return (
    <Link href={team.id} passHref>
      <Card
        // elevation={0}
        variant='outlined'
        sx={{
          cursor: 'pointer',
          p: 3,
          transitionProperty: 'all',
          transitionDuration: theme.transitions.duration.short,
          transitionTimingFunction: theme.transitions.easing.easeInOut,
          // borderRadius: t => t.shape.borderRadius,
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          },
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'inherit',
          }}
        >
          <Typography variant='h4'>{team.name}</Typography>
          <AvatarGroup total={team.members.length}>
            {members?.map((member: Partial<IUser>) => (
              <>
                <Avatar>
                  <Image
                    layout='fill'
                    src={member.profilePic ? member.profilePic : profile3}
                    quality={20}
                  />
                </Avatar>
              </>
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
            justifyContent: 'space-between',
          }}
        >
          <Button variant='contained'>Add Member</Button>
        </Container>
      </Card>
    </Link>
  )
}

export default TeamCard
