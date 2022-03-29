import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { ITeam } from '../util/types'
import { db } from './config'

const createTeam = async (team: ITeam, uid: string) => {
  const collectionRef = collection(db, 'teams')
  const { ...teamData }: ITeam = team
  const teamDocRef = await addDoc(collectionRef, {
    ...teamData,
    admins: [uid],
  })

  teamData.members.map(async memberUid => {
    const userDocRef = doc(db, 'users', memberUid)
    const userDocSnap: DocumentData = await getDoc(userDocRef)
    const teamsPrev: string[] = userDocSnap.data()?.teams
    await updateDoc(userDocRef, 'teams', [...teamsPrev, teamDocRef.id])
  })

  return { teamDocRef, teamData }
}

export default createTeam
