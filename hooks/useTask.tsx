import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { ITask, IUser, TaskWithId } from '../util/types'

const useTask = (taskId: string) => {
  const [taskData, setTaskData] = useState<TaskWithId>({} as TaskWithId)

  useEffect(() => {
    const taskCollectionRef = collection(db, 'tasks')
    const qTask = query(taskCollectionRef, where(documentId(), '==', taskId))
    const unsubscribe = onSnapshot(qTask, querySnapshot => {
      querySnapshot.forEach(doc => {
        setTaskData({
          id:doc.id,
          title: doc.data().title,
          createdBy: doc.data().createdBy,
          description: doc.data().description,
          assignedTo: doc.data().assignedTo,
          parent: doc.data().parent,
          createdAt: doc.data().createdAt,
          modifiedAt: doc.data().modifiedAt,
          dueDate: doc.data().dueDate,
          completed: doc.data().completed,
        })
      })
    })
    return unsubscribe
  }, [taskId])
  return taskData
}

export default useTask
