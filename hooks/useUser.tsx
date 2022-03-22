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

const useUser = (userId: string | undefined) => {
  const [userData, setUserData] = useState<IUser>({} as IUser)

  useEffect(() => {
    console.log(userId)
    if (!userId) return
    const userCollectionRef = collection(db, 'users')
    const qUser = query(userCollectionRef, where(documentId(), '==', userId))
    const unsubscribe = onSnapshot(qUser, querySnapshot => {
      querySnapshot.forEach(doc => {
        setUserData({
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

  return userData
}

export default useUser
