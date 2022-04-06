import { createContext, useContext, useState } from 'react'
import { ITeam } from '../util/types'

export interface ITeamsCtx {
  teamFormModal: boolean
  setTeamFormModal: React.Dispatch<React.SetStateAction<boolean>>
  teamLeaveModal: boolean
  setTeamLeaveModal: React.Dispatch<React.SetStateAction<boolean>>
  teamEdit: ITeam | null
  setTeamEdit: React.Dispatch<React.SetStateAction<ITeam | null>>
  handleOpenCreateModal: () => void
  handleOpenLeaveModal: (team: ITeam) => void
  handleOpenEditModal: (team: ITeam) => void
  handleCloseFormModal: (e: React.SyntheticEvent, reason?: string) => void
  handleCloseLeaveModal: (e: React.SyntheticEvent, reason?: string) => void
}

export const TeamsCtx = createContext<ITeamsCtx>({} as ITeamsCtx)

export const TeamsCtxProvider: React.FC = ({ children }) => {
  const [teamFormModal, setTeamFormModal] = useState<boolean>(false)
  const [teamLeaveModal, setTeamLeaveModal] = useState<boolean>(false)
  const [teamEdit, setTeamEdit] = useState<ITeam | null>(null)

  const handleOpenCreateModal = () => {
    setTeamEdit(null)
    setTeamFormModal(true)
  }

  const handleOpenLeaveModal = (team: ITeam) => {
    setTeamEdit(team)
    setTeamLeaveModal(true)
  }

  const handleOpenEditModal = (team: ITeam) => {
    setTeamEdit(team)
    setTeamFormModal(true)
  }

  const handleCloseFormModal = (e: React.SyntheticEvent, reason?: string) => {
    if (reason === 'backdropClick') return
    setTeamFormModal(false)
  }

  const handleCloseLeaveModal = (e: React.SyntheticEvent, reason?: string) => {
    setTeamLeaveModal(false)
  }

  return (
    <TeamsCtx.Provider
      value={{
        teamFormModal,
        setTeamFormModal,
        teamLeaveModal,
        setTeamLeaveModal,
        teamEdit,
        setTeamEdit,
        handleOpenCreateModal,
        handleOpenEditModal,
        handleOpenLeaveModal,
        handleCloseFormModal,
        handleCloseLeaveModal,
      }}
    >
      {children}
    </TeamsCtx.Provider>
  )
}

export const useTeamsCtx = () => useContext(TeamsCtx)
