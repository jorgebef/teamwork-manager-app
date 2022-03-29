import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ITeam } from '../util/types'
import { db } from './config'

const editTeam = async (team: ITeam) => {
  const { ['id']: teamId, ...teamData }: ITeam = team
  const teamDocRef = doc(db, 'teams', teamId!)

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
      const updatedTeams: string[] = [...teamsPrev, teamId!]
      await updateDoc(userDocRef, 'teams', [...updatedTeams])
    })
  }

  await updateDoc(teamDocRef, {
    ...teamData,
  })
  return { teamDocRef, teamData }
}

export default editTeam
