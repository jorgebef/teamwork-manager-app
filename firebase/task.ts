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

  const creatorDocRef = doc(db, 'users', uid)
  const creatorDocSnap: DocumentData = await getDoc(creatorDocRef)
  const createdPrev: string[] = creatorDocSnap.data()?.createdTasks
  await updateDoc(creatorDocRef, 'createdTasks', [
    ...createdPrev,
    taskDocRef.id,
  ])

  if (taskData.assignedTo) {
    const assignedDocRef = doc(db, 'users', taskData.assignedTo)
    const assignedDocSnap: DocumentData = await getDoc(assignedDocRef)
    const assignedPrev: string[] = assignedDocSnap.data()?.assignedTasks
    await updateDoc(assignedDocRef, 'assignedTasks', [
      ...assignedPrev,
      taskDocRef.id,
    ])
  }

  return { taskDocRef, taskData }
}

export const editTask = async (task: ITask) => {
  const { ['id']: taskId, ...taskData }: ITask = task
  const taskDocRef = doc(db, 'tasks', taskId!)
  const taskDocSnap: DocumentData = await getDoc(taskDocRef)
  // const assignedPrev: string = taskDocSnap.data().assignedTo

  if (
    taskData.assignedTo &&
    taskData.assignedTo !== taskDocSnap.data().assignedTo
  ) {
    const newAssigneeeDocRef = doc(db, 'users', taskData.assignedTo)
    const newAssigneeDocSnap: DocumentData = await getDoc(newAssigneeeDocRef)
    const newAssigneePrev: string[] = newAssigneeDocSnap.data()?.assignedTasks
    await updateDoc(newAssigneeeDocRef, 'assignedTasks', [
      ...newAssigneePrev,
      taskDocRef.id,
    ])

    if (taskDocSnap.data().assignedTo) {
      const oldAssigneeDocRef = doc(db, 'users', taskDocSnap.data().assignedTo)
      const assigneeDocSnap = await getDoc(oldAssigneeDocRef)
      const assignedPrev: string[] = assigneeDocSnap.data()?.createdTasks
      const assignedNew = assignedPrev.filter(t => t !== taskId)
      await updateDoc(oldAssigneeDocRef, 'assignedTasks', [...assignedNew])
    }
  }

  await updateDoc(taskDocRef, {
    ...taskData,
    modifiedAt: serverTimestamp(),
  })
  return { taskDocRef, taskData }
}

export const deleteTask = async (taskId: string) => {
  if (!taskId) return
  const taskDocRef = doc(db, 'tasks', taskId)
  const taskDocSnap: DocumentData = await getDoc(taskDocRef)
  const assigneeId: string | null = taskDocSnap.data()?.assignedTo
  const creatorId: string | null = taskDocSnap.data()?.createdBy
  await deleteDoc(taskDocRef)

  if (assigneeId) {
    const assigneeDocRef = doc(db, 'users', assigneeId)
    const assigneeDocSnap = await getDoc(assigneeDocRef)
    const assignedPrev: string[] = assigneeDocSnap.data()?.createdTasks
    const assignedNew = assignedPrev.filter(t => t !== taskId)
    await updateDoc(assigneeDocRef, 'createdTasks', [...assignedNew])
  }

  if (creatorId) {
    const creatorDocRef = doc(db, 'users', creatorId)
    const creatorDocSnap = await getDoc(creatorDocRef)
    const createdPrev: string[] = creatorDocSnap.data()?.createdTasks
    const createdNew = createdPrev.filter(t => t !== taskId)
    await updateDoc(creatorDocRef, 'createdTasks', [...createdNew])
  }

  return { taskDocRef, taskId }
}
