import { AlertColor } from '@mui/material'
import { createContext, useContext, useEffect, useState } from 'react'

export interface IAlertCtx {
  alertOpen: boolean
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
  alertType: AlertColor
  setAlertType: React.Dispatch<React.SetStateAction<AlertColor>>
  alertMsg: string | null
  setAlertMsg: React.Dispatch<React.SetStateAction<string | null>>
  alertShow: (msg: string, type: AlertColor) => void
  alertHide: (e: React.SyntheticEvent | Event, reason?: string) => void
}

export const AlertCtx = createContext<IAlertCtx>({} as IAlertCtx)

// export const AlertCtx = createContext<IAlertCtx>({
//   alertOpen: false,
//   setAlertOpen: () => {},
//   alertType: 'success',
//   setAlertType: () => {},
//   alertMsg: null,
//   setAlertMsg: () => {},
// })

export const AlertCtxProvider: React.FC = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [alertType, setAlertType] = useState<AlertColor>('success')
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

  const alertShow = (msg: string, type: AlertColor) => {
    if (type) setAlertType(type)
    setAlertMsg(msg)
    setAlertOpen(true)
  }

  const alertHide = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertOpen(false)
  }

  return (
    <AlertCtx.Provider
      value={{
        alertOpen,
        setAlertOpen,
        alertType,
        setAlertType,
        alertMsg,
        setAlertMsg,
        alertShow,
        alertHide,
      }}
    >
      {children}
    </AlertCtx.Provider>
  )
}

export const useAlertCtx = () => useContext(AlertCtx)
