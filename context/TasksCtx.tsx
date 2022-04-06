import { createContext, useContext, useState } from 'react'
import { ITask } from '../util/types'

export interface ITasksCtx {
  expanded: string | false
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>
  handleExpandTask: (
    panel: string
  ) => (e: React.SyntheticEvent, isExpanded: boolean) => void
  taskFormModal: boolean
  setTaskFormModal: React.Dispatch<React.SetStateAction<boolean>>
  taskDelModal: boolean
  setTaskDelModal: React.Dispatch<React.SetStateAction<boolean>>
  taskEdit: ITask | null
  setTaskEdit: React.Dispatch<React.SetStateAction<ITask | null>>
  handleCloseFormModal: (e: React.SyntheticEvent, reason?: string) => void
  handleOpenDelModal: (task: ITask) => void
  handleOpenEditModal: (task: ITask) => void
  handleCloseDelModal: (e: React.SyntheticEvent) => void
  handleOpenCreateModal: () => void
}

export const TasksCtx = createContext<ITasksCtx>({} as ITasksCtx)

export const TasksCtxProvider: React.FC = ({ children }) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [taskFormModal, setTaskFormModal] = useState<boolean>(false)
  const [taskDelModal, setTaskDelModal] = useState<boolean>(false)
  const [taskEdit, setTaskEdit] = useState<ITask | null>(null)

  const handleCloseFormModal = (e: React.SyntheticEvent, reason?: string) => {
    // Here we handle the case were we click on the backdrop
    // by having a conditional prop "reason", we can use this
    // function both in onClose and onClick
    if (reason === 'backdropClick') return
    setTaskFormModal(false)
  }

  const handleCloseDelModal = (e: React.SyntheticEvent) => {
    setTaskDelModal(false)
  }

  const handleOpenCreateModal = () => {
    setExpanded(false)
    setTaskEdit(null)
    setTaskFormModal(true)
  }

  const handleExpandTask =
    (panel: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      // Disable closing the Accordion by clicking the Sumary only when open
      // force the user to use the closing arrow
      // This way we can implement the MoreHorizRounded icon for editing and deleting
      if (expanded === e.currentTarget.id) return
      setExpanded(isExpanded ? panel : false)
    }

  const handleOpenDelModal = (task: ITask) => {
    setTaskEdit(task)
    setTaskDelModal(true)
  }

  const handleOpenEditModal = (task: ITask) => {
    setTaskEdit(task)
    setTaskFormModal(true)
  }

  return (
    <TasksCtx.Provider
      value={{
        expanded,
        setExpanded,
        handleExpandTask,
        taskFormModal,
        setTaskFormModal,
        taskDelModal,
        setTaskDelModal,
        taskEdit,
        setTaskEdit,
        handleCloseFormModal,
        handleOpenEditModal,
        handleOpenDelModal,
        handleCloseDelModal,
        handleOpenCreateModal,
      }}
    >
      {children}
    </TasksCtx.Provider>
  )
}

export const useTasksCtx = () => useContext(TasksCtx)
