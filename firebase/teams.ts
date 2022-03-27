import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ITask, ITeam, ITeamWithId } from '../util/types'
import { db } from './config'

export const createTeam = async (team: ITeam, uid: string) => {
  const collectionRef = collection(db, 'teams')
  const { ...teamData }: ITeam = team
  const teamDocRef = await addDoc(collectionRef, {
    ...teamData,
  })

  const userDocRef = doc(db, 'users', uid)
  const userDocSnap: DocumentData = await getDoc(userDocRef)
  const teamsPrev: string[] = userDocSnap.data()?.teams
  await updateDoc(userDocRef, 'teams', [...teamsPrev, teamDocRef.id])

  return { teamDocRef, teamData }
}

export const editTeam = async (team: ITeamWithId) => {
  const { ['id']: teamId, ...teamData }: ITeamWithId = team
  const teamDocRef = doc(db, 'teams', teamId)

  const teamDocSnap = await getDoc(teamDocRef)
  const membersPrev: string[] | null = teamDocSnap.data()?.members
  const membersCurr: string[] | null = teamData.members
  console.log('PreviousMembers: ' + membersPrev)
  console.log('currentMembers: ' + teamData.members)

  const removedMembers: string[] | undefined = membersPrev?.filter(
    m => !membersCurr?.includes(m)
  )
  const addedMembers: string[] | undefined = membersCurr?.filter(
    m => !membersPrev?.includes(m)
  )
  console.log(`Added Members: ${addedMembers}`)
  console.log(`Removed Members: ${removedMembers}`)
  if (removedMembers) {
    removedMembers.map(async member => {
      const userDocRef = doc(db, 'users', member)
      const userDocSnap = await getDoc(userDocRef)
      const teamsPrev: string[] = userDocSnap.data()?.teams
      const updatedTeams: string[] = teamsPrev?.filter(t => t !== teamId)
      await updateDoc(userDocRef, 'teams', [...updatedTeams])
    })
  }
  if (addedMembers) {
    addedMembers.map(async member => {
      const userDocRef = doc(db, 'users', member)
      const userDocSnap = await getDoc(userDocRef)
      const teamsPrev: string[] = userDocSnap.data()?.teams
      const updatedTeams: string[] = [...teamsPrev, teamId]
      await updateDoc(userDocRef, 'teams', [...updatedTeams])
    })
  }

  await updateDoc(teamDocRef, {
    ...teamData,
  })
  return { teamDocRef, teamData }
}

export const leaveTeam = async (team: ITeam, uid: string) => {
  const { ['id']: teamId, ...teamData }: ITeam = team

  const teamDocRef = doc(db, 'teams', teamId!)
  const teamDocSnap = await getDoc(teamDocRef)
  const membersPrev: string[] = teamDocSnap.data()?.members
  const membersCurr: string[] = membersPrev.filter(m => m !== uid)
  await updateDoc(teamDocRef, 'members', [...membersCurr])

  const userDocRef = doc(db, 'users', uid)
  const userDocSnap: DocumentData = await getDoc(userDocRef)
  const teamsPrev: string[] = userDocSnap.data()?.teams
  const teamsCurr: string[] = teamsPrev.filter(t => t !== teamId)
  await updateDoc(userDocRef, 'teams', [...teamsCurr])

  return { teamDocRef, teamData }
}
