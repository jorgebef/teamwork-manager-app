import {
  collection,
  doc,
  DocumentData,
  documentId,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { ITask } from '../util/types'

const taskCollectionRef = collection(db, 'tasks')
const batches: ITask[] = []

const docData = (doc: QueryDocumentSnapshot<DocumentData>) => {
  return {
    ...doc.data(),
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
  }
}

export const useTask = (taskId: string | undefined) => {
  const [taskData, setTaskData] = useState<ITask | null>(null)

  useEffect(() => {
    if (!taskId) return
    const qTask = query(taskCollectionRef, where(documentId(), '==', taskId))
    const unsubscribe = onSnapshot(qTask, querySnapshot => {
      querySnapshot.forEach(doc => {
        setTaskData(docData(doc))
      })
    })
    return unsubscribe
  }, [taskId])

  return taskData
}

export const useTaskArr = (taskArr: string[] | null) => {
  const [taskArrData, setTaskArrData] = useState<ITask[] | null>(null)

  useEffect(() => {
    if (!taskArr || taskArr.length == 0) return

    // TESTING WITH MORE THAN 10
    const taskList = [...taskArr, ...taskArr, ...taskArr]

    const qTask = query(taskCollectionRef, where(documentId(), 'in', taskList))
    const unsubscribe = onSnapshot(qTask, querySnapshot => {
      setTaskArrData(querySnapshot.docs.map<ITask>(doc => docData(doc)))
    })
    return unsubscribe
  }, [taskArr])

  return taskArrData
}

export const useTeamTasks = (teamId: string | undefined) => {
  const [tasks, setTasks] = useState<ITask[] | null>(null)

  useEffect(() => {
    if (!teamId) return
    const qTask = query(taskCollectionRef, where('parent', '==', teamId))
    const unsubscribe = onSnapshot(qTask, querySnapshot => {
      setTasks(querySnapshot.docs.map<ITask>(doc => docData(doc)))
    })
    return unsubscribe
  }, [teamId])

  return tasks
}

export const useUserTasks = (uid: string) => {
  const [createdTasks, setCreatedTasks] = useState<ITask[]>([])
  const [assignedTasks, setAssignedTasks] = useState<ITask[]>([])
  const [tasks, setTasks] = useState<ITask[] | null>(null)

  useEffect(() => {
    // const tasks: ITask[] = []
    const qCreated = query(taskCollectionRef, where('createdBy', '==', uid))
    const qAssigned = query(taskCollectionRef, where('assignedTo', '==', uid))
    onSnapshot(qCreated, querySnapshot => {
      setCreatedTasks([...querySnapshot.docs.map<ITask>(doc => docData(doc))])
    })
    onSnapshot(qAssigned, querySnapshot => {
      setAssignedTasks([...querySnapshot.docs.map<ITask>(doc => docData(doc))])
    })
    // return unsubscribe
  }, [uid])

  useEffect(() => {
    const intersection = createdTasks.filter(cT =>
      assignedTasks.find(aT => aT.id == cT.id)
    )
    const difference = createdTasks
      .filter(t => !assignedTasks.find(aT => aT.id == t.id))
      .concat(
        assignedTasks.filter(aT => !createdTasks.find(cT => cT.id == aT.id))
      )
    setTasks([...intersection, ...difference])
  }, [createdTasks, assignedTasks])
  return tasks
}
