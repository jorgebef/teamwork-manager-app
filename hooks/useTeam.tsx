import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { ITeam } from '../util/types'

const useTeam = (teamId: string|null) => {
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
          description: doc.data().description,
        })
      })
    })
    return unsubscribe
  }, [teamId])
  return teamData
}

export default useTeam
