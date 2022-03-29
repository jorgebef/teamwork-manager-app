import {
  collection,
  documentId,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { ITeam } from '../util/types'

export const useTeam = (teamId: string | null) => {
  const [teamData, setTeamData] = useState<ITeam>({} as ITeam)

  useEffect(() => {
    if (!teamId) return
    const teamCollectionRef = collection(db, 'teams')
    const qTeam = query(teamCollectionRef, where(documentId(), '==', teamId))
    const unsubscribe = onSnapshot(qTeam, querySnapshot => {
      querySnapshot.forEach(doc => {
        setTeamData({
          ...doc.data(),
          name: doc.data().name,
          members: doc.data().members,
          projects: doc.data().projects,
          admins: doc.data().admins,
          description: doc.data().description,
        })
      })
    })
    return unsubscribe
  }, [teamId])
  return teamData
}

export const useTeamArr = (teamArr: string[]) => {
  const [teamsData, setTeamsData] = useState<ITeam[]>([])

  useEffect(() => {
    if (!teamArr || teamArr.length == 0) return
    const teamsCollectionRef = collection(db, 'teams')
    const qTeams = query(teamsCollectionRef, where(documentId(), 'in', teamArr))
    const unsubscribe = onSnapshot(qTeams, querySnapshot => {
      setTeamsData(
        querySnapshot.docs.map<ITeam>(doc => ({
          ...doc.data(),
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          members: doc.data().members,
          admins: doc.data().admins,
          projects: doc.data().projects,
        }))
      )
    })
    return unsubscribe
  }, [teamArr])

  return teamsData
}

export const useUserTeams = (uid: string) => {
  const [teams, setTeams] = useState<ITeam[] | null>(null)

  useEffect(() => {
    const teamsCollectionRef = collection(db, 'teams')
    const qTeams = query(
      teamsCollectionRef,
      where('members', 'array-contains', uid)
    )
    const unsubscribe = onSnapshot(qTeams, QuerySnapshot => {
      setTeams(
        QuerySnapshot.docs.map<ITeam>(doc => ({
          ...doc.data(),
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          members: doc.data().members,
          admins: doc.data().admins,
          projects: doc.data().projects,
        }))
      )
    })
    return unsubscribe
  }, [uid])

  return teams
}
