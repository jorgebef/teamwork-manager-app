import { FieldValue } from 'firebase/firestore'

export interface ITask {
  id?: string
  title: string
  createdBy: string | undefined
  description: string
  assignedTo: string | null
  parent: string | null
  createdAt: number | FieldValue
  modifiedAt: number | FieldValue | null
  dueDate: number | null
  completed: boolean
}

export const taskDefault: ITask = {
  title: '',
  createdBy: undefined,
  description: '',
  assignedTo: null,
  parent: null,
  createdAt: Date.now(),
  modifiedAt: null,
  dueDate: Date.now(),
  completed: false,
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
  id?: string
  name: string
  projects: string[]
  admins: string[]
  members: string[]
  description: string
}

export const teamDefault: ITeam = {
  name: '',
  description: '',
  projects: [],
  members: [],
  admins: [],
}

export interface IProject {
  id?: string
  title: string
  leader: string
  description: string
  parent: string
  members: string[]
  completed: boolean
}
