import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  serverTimestamp,
} from 'firebase/firestore'
import { ITask, TaskWithId } from '../util/types'
import { db } from './config'

export const createTask = async (task: ITask | null) => {
  if (!task) return
  const collectionRef = collection(db, 'tasks')
  // const { ['id']: _, ...newTask }: TaskWithId = task
  const { ...newTask }: ITask = task
  const docRef = await addDoc(collectionRef, {
    ...newTask,
    createdAt: serverTimestamp(),
    modifiedAt: serverTimestamp(),
  })
  return { docRef, newTask }
}

export const deleteTask = async (id: string | null) => {
  if (!id) return
  const docRef = doc(db, 'tasks', id)
  await deleteDoc(docRef)
  return { docRef, id }
}
