import { doc, getDoc } from 'firebase/firestore'
import { db } from './config'

export const fetchUser = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid)
  const userDocSnap = await getDoc(userDocRef)
  return userDocSnap
}
