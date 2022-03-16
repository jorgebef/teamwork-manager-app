import { useContext, useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/config'
import { TaskWithId, ITask } from '../../util/types'
import TaskList from '../../components/TaskList'
import { useAuthCtx } from '../../context/AuthCtx'

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskWithId[]>([])
  const { user } = useAuthCtx()

  useEffect(() => {
    if (!user) return

    const collectionRef = collection(db, 'tasks')

    // const q = query(collectionRef)
    // const q = query(collectionRef, orderBy('dueDate', 'desc'))
    const q1 = query(
      collectionRef,
      where('createdBy', '==', user.uid),
    )
    const q2 = query(
      collectionRef,
      where('asignee', '==', user.uid),
    )

    const unsubscribe = onSnapshot(q1, QuerySnapshot => {
      setTasks(
        QuerySnapshot.docs.map<TaskWithId>(doc => ({
          ...doc.data(),
          id: doc.id,
          title: doc.data().title,
          createdBy: user?.uid ? user.uid : '',
          description: doc.data().description,
          asignee: doc.data().asignee,
          parent: doc.data().parentProject,
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
