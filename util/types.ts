import { FieldValue } from 'firebase/firestore'

export interface ITask {
  // id: string
  title: string | null
  createdBy: string | undefined
  description: string | null
  assignedTo: string | null
  parent: string | null
  createdAt: number | FieldValue
  modifiedAt: number | FieldValue | null
  dueDate: number | null
  completed: boolean
}

export const taskDefault: ITask = {
  title: null,
  createdBy: undefined,
  description: null,
  assignedTo: null,
  parent: null,
  createdAt: Date.now(),
  modifiedAt: null,
  dueDate: Date.now(),
  completed: false,
}

export interface TaskWithId extends ITask {
  id: string
}

export interface IUser {
  uid: string
  userName: string
  email: string
  profilePic: string
  assignedTasks: string[]
  createdTasks: string[]
  teams: string[]
}

export interface ITeam {
  name: string
  projects: string[]
  members: string[]
  description: string
}

export interface ITeamWithId extends ITeam {
  id: string
}

export const teamDefault: ITeam = {
  name: '',
  description: '',
  projects: [],
  members: [],
}
