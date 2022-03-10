export type ITask = {
  id: string
  title: string
  description: string
  asignee: string
  parentProject: string
  createdAt: Date
  modifiedAt: Date
  dueDate: Date
}
