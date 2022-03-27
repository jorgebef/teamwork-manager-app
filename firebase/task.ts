import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ITask } from '../util/types'
import { db } from './config'

export const createTask = async (task: ITask, uid: string) => {
  const collectionRef = collection(db, 'tasks')
  // const { ['id']: _, ...newTask }: TaskWithId = task
  const { ...taskData }: ITask = task
  const taskDocRef = await addDoc(collectionRef, {
    ...taskData,
    createdAt: serverTimestamp(),
    completed: false,
  })

  const userDocRef = doc(db, 'users', uid)
  const userDocSnap: DocumentData = await getDoc(userDocRef)
  const tasksPrev: string[] = userDocSnap.data()?.createdTasks
  await updateDoc(userDocRef, 'createdTasks', [...tasksPrev, taskDocRef.id])

  return { taskDocRef, taskData }
}

export const editTask = async (task: ITask) => {
  const { ['id']: taskId, ...taskData }: ITask = task
  const taskDocRef = doc(db, 'tasks', taskId!)
  await updateDoc(taskDocRef, {
    ...taskData,
    modifiedAt: serverTimestamp(),
  })
  return { taskDocRef, taskData }
}

export const deleteTask = async (taskId: string | null, uid: string) => {
  if (!taskId) return
  const taskDocRef = doc(db, 'tasks', taskId)
  await deleteDoc(taskDocRef)

  const userDocRef = doc(db, 'users', uid)
  const userDocSnap = await getDoc(userDocRef)
  const tasksPrev: string[] = userDocSnap.data()?.createdTasks
  const updatedTasks = tasksPrev.filter(t => t !== taskId)
  await updateDoc(userDocRef, 'createdTasks', [...updatedTasks])

  return { taskDocRef, taskId }
}
