import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { IUser } from '../util/types'

export const useUser = (userId: string) => {
  const [user, setUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    const userCollectionRef = collection(db, 'users')
    const qUser = query(userCollectionRef, where(documentId(), '==', userId))
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      querySnapshot.forEach(doc => {
        setUser({
          ...doc.data(),
          uid: doc.data().uid,
          userName: doc.data().userName,
          email: doc.data().userName,
          profilePic: doc.data().profilePic,
          teams: doc.data().teams,
          createdTasks: doc.data().createdTasks,
          assignedTasks: doc.data().assignedTasks,
        })
      })
    })
    return unsubscribe
  }, [userId])

  return user
}

export const useTeamUsers = (teamId: string | undefined | null) => {
  const [users, setUsers] = useState<IUser[] | null>(null)

  useEffect(() => {
    if (!teamId) return
    const userCollectionRef = collection(db, 'users')
    const qUser = query(
      userCollectionRef,
      where('teams', 'array-contains', teamId)
    )
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      setUsers(
        querySnapshot.docs.map<IUser>(doc => ({
          ...doc.data(),
          uid: doc.data().uid,
          userName: doc.data().userName,
          email: doc.data().userName,
          profilePic: doc.data().profilePic,
          teams: doc.data().teams,
          createdTasks: doc.data().createdTasks,
          assignedTasks: doc.data().assignedTasks,
        }))
      )
    })
    return unsubscribe
  }, [teamId])
  return users
}
