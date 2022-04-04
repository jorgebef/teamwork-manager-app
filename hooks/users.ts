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
import { IUser } from '../util/types'

const userCollectionRef = collection(db, 'users')

const docData = (doc: QueryDocumentSnapshot<DocumentData>) => {
  return {
    ...doc.data(),
    uid: doc.data().uid,
    userName: doc.data().userName,
    email: doc.data().userName,
    profilePic: doc.data().profilePic,
    teams: doc.data().teams,
    createdTasks: doc.data().createdTasks,
    assignedTasks: doc.data().assignedTasks,
  }
}

export const useUser = (uid: string | undefined) => {
  const [user, setUser] = useState<IUser>({} as IUser)

  useEffect(() => {
    if (!uid) return
    const qUser = query(userCollectionRef, where(documentId(), '==', uid))
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      querySnapshot.forEach(doc => {
        setUser(docData(doc))
      })
    })
    return unsubscribe
  }, [uid])

  return user
}

export const useTeamUsers = (teamId: string | undefined | null) => {
  const [users, setUsers] = useState<IUser[] | null>(null)

  useEffect(() => {
    if (!teamId) return
    const qUser = query(
      userCollectionRef,
      where('teams', 'array-contains', teamId)
    )
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      setUsers(querySnapshot.docs.map<IUser>(doc => docData(doc)))
    })
    return unsubscribe
  }, [teamId])
  return users
}
