import { useEffect, useState } from 'react'
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/config'
import { TaskWithId } from '../../util/types'
import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'
import { fetchUserTasks } from '../../firebase/task'

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskWithId[]>([])
  const [taskList, setTaskList] = useState<string[] | null>(null)
  const { user } = useAuthCtx()

  useEffect(() => {
    if (!user) return

    const userCollectionRef = collection(db, 'users')

    const q = query(userCollectionRef, where(documentId(), '==', user.uid))
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const tasks: string[] = []
      querySnapshot.forEach(doc => {
        tasks.push(...doc.data().createdTasks)
        tasks.push(...doc.data().assignedTasks)
      })
      setTaskList(tasks)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    console.log(taskList)
    if (!user || !taskList || taskList?.length == 0) return

    const collectionRef = collection(db, 'tasks')
    const q = query(collectionRef, where(documentId(), 'in', taskList))

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      setTasks(
        QuerySnapshot.docs.map<TaskWithId>(doc => ({
          ...doc.data(),
          id: doc.id,
          title: doc.data().title,
          createdBy: user?.uid ? user.uid : '',
          description: doc.data().description,
          assignedTo: doc.data().assignedTo,
          parent: doc.data().parentProject,
          // createdAt: doc.data().createdAt.toDate().getTime(),
          // modifiedAt: doc.data().modifiedAt.toDate().getTime(),
          // dueDate: doc.data().dueDate.toDate().getTime(),
          createdAt: doc.data().createdAt,
          modifiedAt: doc.data().modifiedAt,
          dueDate: doc.data().dueDate,
          completed: doc.data().completed,
        }))
      )
    })

    return unsubscribe
  }, [taskList])

  return <TaskList tasks={tasks} />
}

export default Tasks
