import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { ITask } from '../util/types'
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

export const fetchTaskList = async (uid: string) => {
  const tasksRef = collection(db, 'tasks')

  const q = query(tasksRef, where('createdBy', '==', uid))

  const querySnapshot = await getDocs(q)

  return q
}
