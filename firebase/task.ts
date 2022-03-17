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

export const createTask = async (task: ITask | null, uid: string) => {
  if (!task) return
  const collectionRef = collection(db, 'tasks')
  // const { ['id']: _, ...newTask }: TaskWithId = task
  const { ...newTask }: ITask = task
  const docRef = await addDoc(collectionRef, {
    ...newTask,
    createdAt: serverTimestamp(),
    modifiedAt: serverTimestamp(),
  })

  const userDocRef = doc(db, 'users', uid)
  const userDocSnap: DocumentData = await getDoc(userDocRef)
  const tasksPrev: string[] = userDocSnap.data()?.createdTasks
  await updateDoc(userDocRef, 'createdTasks', [...tasksPrev, docRef.id])

  return { docRef, newTask }
}

export const deleteTask = async (taskId: string | null, uid: string) => {
  if (!taskId) return
  const docRef = doc(db, 'tasks', taskId)
  await deleteDoc(docRef)

  const userDocRef = doc(db, 'users', uid)
  const userDocSnap = await getDoc(userDocRef)
  const tasksPrev: string[] = userDocSnap.data()?.createdTasks
  const updatedTasks = tasksPrev.filter(t => t !== taskId)
  await updateDoc(userDocRef, 'createdTasks', [...updatedTasks])

  return { docRef, taskId }
}
