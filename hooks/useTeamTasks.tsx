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

const useTeamTasks = (teamId: string | undefined) => {
  const [tasks, setTasks] = useState<TaskWithId[]>([])

  useEffect(() => {
    if (!teamId) return
    const taskCollectionRef = collection(db, 'tasks')
    const qTask = query(taskCollectionRef, where('parent', '==', teamId))
    const unsubscribe = onSnapshot(qTask, querySnapshot => {
      setTasks(
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
  }, [teamId])
  // const taskIds: string[] = tasks.length == 0 ? [] : tasks.map(t => t.id)
  // return tasks.map(t => t.id)
  return tasks
}

export default useTeamTasks
