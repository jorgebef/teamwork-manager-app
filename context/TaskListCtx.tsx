import { createContext, useContext, useEffect, useState } from 'react'
import { ITask } from '../util/types'

export interface ITaskListCtx {
  expanded: string | false
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>
  taskFormModal: boolean
  setTaskFormModal: React.Dispatch<React.SetStateAction<boolean>>
  taskDelModal: boolean
  setTaskDelModal: React.Dispatch<React.SetStateAction<boolean>>
  taskEdit: ITask | null
  setTaskEdit: React.Dispatch<React.SetStateAction<ITask | null>>
}

export const TaskListCtx = createContext<ITaskListCtx>({} as ITaskListCtx)

export const TaskListCtxProvider: React.FC = ({ children }) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [taskFormModal, setTaskFormModal] = useState<boolean>(false)
  const [taskDelModal, setTaskDelModal] = useState<boolean>(false)
  const [taskEdit, setTaskEdit] = useState<ITask | null>(null)

  return (
    <TaskListCtx.Provider
      value={{
        expanded,
        setExpanded,
        taskFormModal,
        setTaskFormModal,
        taskDelModal,
        setTaskDelModal,
        taskEdit,
        setTaskEdit,
      }}
    >
      {children}
    </TaskListCtx.Provider>
  )
}

export const useTaskListCtx = () => useContext(TaskListCtx)
