import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { ITeam } from '../util/types'
import { db } from './config'
 const leaveTeam = async (team: ITeam, uid: string) => {
  const { ['id']: teamId, ...teamData }: ITeam = team

  const teamDocRef = doc(db, 'teams', teamId!)
  const teamDocSnap = await getDoc(teamDocRef)
  const membersPrev: string[] = teamDocSnap.data()?.members
  const membersCurr: string[] = membersPrev.filter(m => m !== uid)
  await updateDoc(teamDocRef, 'members', [...membersCurr])
  if (membersCurr.length == 0) await deleteDoc(teamDocRef)

  const userDocRef = doc(db, 'users', uid)
  const userDocSnap: DocumentData = await getDoc(userDocRef)
  const teamsPrev: string[] = userDocSnap.data()?.teams
  const teamsCurr: string[] = teamsPrev.filter(t => t !== teamId)
  await updateDoc(userDocRef, 'teams', [...teamsCurr])

  return { teamDocRef, teamData }
}

export default leaveTeam
