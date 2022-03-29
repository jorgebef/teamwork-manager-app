import { createContext, useContext, useEffect, useState } from 'react'
import { ITask, ITeam } from '../util/types'

export interface IActionsCtx {
  expanded: string | false
  setExpanded: React.Dispatch<React.SetStateAction<string | false>>
  taskFormModal: boolean
  setTaskFormModal: React.Dispatch<React.SetStateAction<boolean>>
  taskDelModal: boolean
  setTaskDelModal: React.Dispatch<React.SetStateAction<boolean>>
  taskEdit: ITask | null
  setTaskEdit: React.Dispatch<React.SetStateAction<ITask | null>>

  teamFormModal: boolean
  setTeamFormModal: React.Dispatch<React.SetStateAction<boolean>>
  teamLeaveModal: boolean
  setTeamLeaveModal: React.Dispatch<React.SetStateAction<boolean>>
  teamEdit: ITeam | null
  setTeamEdit: React.Dispatch<React.SetStateAction<ITeam | null>>
}

export const ActionsCtx = createContext<IActionsCtx>({} as IActionsCtx)

export const ActionsCtxProvider: React.FC = ({ children }) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [taskFormModal, setTaskFormModal] = useState<boolean>(false)
  const [taskDelModal, setTaskDelModal] = useState<boolean>(false)
  const [taskEdit, setTaskEdit] = useState<ITask | null>(null)

  const [teamFormModal, setTeamFormModal] = useState<boolean>(false)
  const [teamLeaveModal, setTeamLeaveModal] = useState<boolean>(false)
  const [teamEdit, setTeamEdit] = useState<ITeam | null>(null)

  return (
    <ActionsCtx.Provider
      value={{
        expanded,
        setExpanded,
        taskFormModal,
        setTaskFormModal,
        taskDelModal,
        setTaskDelModal,
        taskEdit,
        setTaskEdit,
        teamFormModal,
        setTeamFormModal,
        teamLeaveModal,
        setTeamLeaveModal,
        teamEdit,
        setTeamEdit,
      }}
    >
      {children}
    </ActionsCtx.Provider>
  )
}

export const useActionsCtx = () => useContext(ActionsCtx)
