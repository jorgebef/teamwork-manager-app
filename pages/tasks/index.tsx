import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from 'firebase/firestore'
import { db } from '../../util/firebase'
import { TaskWithId, ITask } from '../../util/types'
import TaskList from '../../components/TaskList'

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskWithId[]>([])

  useEffect(() => {
    const collectionRef = collection(db, 'tasks')

    // const q = query(collectionRef)
    const q = query(collectionRef, orderBy('dueDate', 'desc'))

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      setTasks(
        QuerySnapshot.docs.map<TaskWithId>(doc => ({
          ...doc.data(),
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          asignee: doc.data().asignee,
          parentProject: doc.data().parentProject,
          // createdAt: doc.data().createdAt.toDate().getTime(),
          // modifiedAt: doc.data().modifiedAt.toDate().getTime(),
          // dueDate: doc.data().dueDate.toDate().getTime(),
          createdAt: doc.data().createdAt,
          modifiedAt: doc.data().modifiedAt,
          dueDate: doc.data().dueDate,
        }))
      )
    })

    return unsubscribe
  }, [])

  return <TaskList tasks={tasks} />
}

export default Tasks
