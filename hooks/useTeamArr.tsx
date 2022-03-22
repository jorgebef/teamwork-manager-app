import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { ITeam, ITeamWithId, IUser } from '../util/types'

const useTeamArr = (teamArr: string[]) => {
  const [teamsData, setTeamsData] = useState<ITeamWithId[]>([])

  useEffect(() => {
    if (!teamArr || teamArr.length == 0) return
    const teamsCollectionRef = collection(db, 'teams')
    const qTeams = query(teamsCollectionRef, where(documentId(), 'in', teamArr))
    const unsubscribe = onSnapshot(qTeams, querySnapshot => {
      setTeamsData(
        querySnapshot.docs.map<ITeamWithId>(doc => ({
          ...doc.data(),
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          members: doc.data().members,
          admins: doc.data().admins,
        }))
      )
    })
    return unsubscribe
  }, [teamArr])

  return teamsData
}

export default useTeamArr
