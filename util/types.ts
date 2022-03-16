import { FieldValue } from 'firebase/firestore'

export interface ITask {
  // id: string
  title: string | null
  createdBy: string | undefined
  description: string | null
  asignee: string | null
  parent: string | null
  createdAt: number | FieldValue
  modifiedAt: number | FieldValue | null
  dueDate: number | null
}

export const taskDefault: ITask = {
  title: null,
  createdBy: undefined,
  description: null,
  asignee: null,
  parent: null,
  createdAt: Date.now(),
  modifiedAt: null,
  dueDate: Date.now(),
}

export interface TaskWithId extends ITask {
  id: string
}
