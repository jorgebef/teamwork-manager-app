import { Typography } from '@mui/material'
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import TeamList from '../../components/TeamList'
import { useAuthCtx } from '../../context/AuthCtx'
import { db } from '../../firebase/config'
import {  ITeamWithId } from '../../util/types'


const Teams: NextPage = () => {
  const [teamList, setTeamList] = useState<string[] | null>(null)
  const [teams, setTeams] = useState<ITeamWithId[]>([])
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
      setTeamList(userTeams)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    // console.log(teamList)
    if (!teamList || !user) return
    if (teamList?.length == 0) {
      setLoading(false)
      return
    }

    const collectionRef = collection(db, 'teams')
    const q = query(collectionRef, where(documentId(), 'in', teamList))

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      setTeams(
        QuerySnapshot.docs.map<ITeamWithId>(doc => ({
          ...doc.data(),
          id: doc.id,
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
      ) : (
        <TeamList teams={teams} />
      )}
    </>
  )
}

export default Teams
