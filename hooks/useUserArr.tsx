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

const useUserArr = (uidArr: string[] | null) => {
  const [userData, setUserData] = useState<IUser[]>([])

  useEffect(() => {
    if (!uidArr || uidArr.length == 0) return
    const usersCollectionRef = collection(db, 'users')
    const qUsers = query(usersCollectionRef, where(documentId(), 'in', uidArr))
    const unsubscribe = onSnapshot(qUsers, querySnapshot => {
      setUserData(
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
  }, [uidArr])

  return userData
}

export default useUserArr
