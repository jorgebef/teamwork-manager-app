import {
  Avatar,
  AvatarGroup,
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
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAuthCtx } from '../../context/AuthCtx'
import { db } from '../../firebase/config'
import profile1 from '../../public/profile1.jpg'
import profile2 from '../../public/profile2.jpg'
import profile3 from '../../public/profile3.jpg'
import { ITeam } from '../../util/types'

const Teams: NextPage = () => {
  const theme = useTheme()
  const [teamList, setTeamList] = useState<string[] | null>(null)
  const [teams, setTeams] = useState<ITeam[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useAuthCtx()

  useEffect(() => {
    if (!user) return

    const userCollectionRef = collection(db, 'users')

    const q = query(userCollectionRef, where(documentId(), '==', user.uid))
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const userTeams: string[] = []
      querySnapshot.forEach(doc => {
        userTeams.push(...doc.data().teams)
      })
      console.log(userTeams)
      setTeamList(userTeams)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    console.log(teamList)
    if (!teamList || !user || teamList?.length == 0) return

    const collectionRef = collection(db, 'teams')
    const q = query(collectionRef, where(documentId(), 'in', teamList))

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      setTeams(
        QuerySnapshot.docs.map<ITeam>(doc => ({
          ...doc.data(),
          name: doc.data().name,
          description: doc.data().description,
          members: [...doc.data().members],
          admins: [...doc.data().admins],
        }))
      )
      setLoading(false)
    })

    return unsubscribe
  }, [teamList])

  return (
    <>
      {loading ? (
        <Typography>LOADING...</Typography>
      ) : teams ? (
        teams.map(team => {
          return (
            <Link href='/dashboard' passHref>
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
                    <Avatar>
                      {/* <Image src={profile1} quality={20} /> */}
                    </Avatar>
                    <Avatar>
                      {/* <Image src={profile2} quality={20} /> */}
                    </Avatar>
                    <Avatar>
                      {/* <Image src={profile3} quality={20} /> */}
                    </Avatar>
                  </AvatarGroup>
                </Container>
                <Divider sx={{ mt: 1, mb: 2 }} />
                <Container sx={{ display: 'flex' }}>
                  <Typography variant='body1'>{team.description}</Typography>
                </Container>
              </Card>
            </Link>
          )
        })
      ) : (
        <Typography>NO TEAMS</Typography>
      )}
    </>
  )
}

export default Teams
