import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { TaskWithId } from '../util/types'

const useTaskArr = (taskArr: string[]) => {
  const [taskArrData, setTaskArrData] = useState<TaskWithId[]>([])

  useEffect(() => {
    if (taskArr.length == 0) {
      setTaskArrData([])
      return
    }
    const taskCollectionRef = collection(db, 'tasks')
    const qTask = query(taskCollectionRef, where(documentId(), 'in', taskArr))
    const unsubscribe = onSnapshot(qTask, querySnapshot => {
      setTaskArrData(
        querySnapshot.docs.map<TaskWithId>(doc => ({
          id: doc.id,
          title: doc.data().title,
          createdBy: doc.data().createdBy,
          description: doc.data().description,
          assignedTo: doc.data().assignedTo,
          parent: doc.data().parent,
          createdAt: doc.data().createdAt,
          modifiedAt: doc.data().modifiedAt,
          dueDate: doc.data().dueDate,
          completed: doc.data().completed,
        }))
      )
    })
    return unsubscribe
  }, [taskArr])
  return taskArrData
}

export default useTaskArr
