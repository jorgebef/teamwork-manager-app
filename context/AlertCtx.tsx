import { AlertColor } from '@mui/material'
import { createContext, useContext, useEffect, useState } from 'react'

export interface IAlertCtx {
  alertOpen: boolean
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
  alertType: AlertColor
  setAlertType: React.Dispatch<React.SetStateAction<AlertColor>>
  alertMsg: string | null
  setAlertMsg: React.Dispatch<React.SetStateAction<string | null>>
}

export const AlertCtx = createContext<IAlertCtx>({
  alertOpen: false,
  setAlertOpen: () => {},
  alertType: 'success',
  setAlertType: () => {},
  alertMsg: null,
  setAlertMsg: () => {},
})

export const AlertCtxProvider: React.FC = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

  return (
    <AlertCtx.Provider
      value={{
        alertOpen,
        setAlertOpen,
        alertType,
        setAlertType,
        alertMsg,
        setAlertMsg,
      }}
    >
      {children}
    </AlertCtx.Provider>
  )
}

export const useAlertCtx = () => useContext(AlertCtx)
