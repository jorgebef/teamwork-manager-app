import {
  collection,
  DocumentData,
  documentId,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { ITeam } from '../util/types'

const teamCollectionRef = collection(db, 'teams')

const docData = (doc: QueryDocumentSnapshot<DocumentData>) => {
  return {
    ...doc.data(),
    id: doc.id,
    name: doc.data().name,
    members: doc.data().members,
    projects: doc.data().projects,
    admins: doc.data().admins,
    description: doc.data().description,
  }
}

export const useTeam = (teamId: string | undefined | null) => {
  const [teamData, setTeamData] = useState<ITeam>({} as ITeam)

  useEffect(() => {
    if (!teamId) return
    const qTeam = query(teamCollectionRef, where(documentId(), '==', teamId))
    const unsubscribe = onSnapshot(qTeam, querySnapshot => {
      querySnapshot.forEach(doc => {
        setTeamData(docData(doc))
      })
    })
    return unsubscribe
  }, [teamId])
  return teamData
}

export const useUserTeams = (uid: string | undefined) => {
  const [teams, setTeams] = useState<ITeam[] | null>(null)

  useEffect(() => {
    if (!uid) return
    const qTeams = query(
      teamCollectionRef,
      where('members', 'array-contains', uid)
    )
    const unsubscribe = onSnapshot(qTeams, querySnapshot => {
      setTeams(querySnapshot.docs.map<ITeam>(doc => docData(doc)))
    })
    return unsubscribe
  }, [uid])

  return teams
}
