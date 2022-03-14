import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

export interface IAuthCtx {
  localAuth: boolean
  setLocalAuth: React.Dispatch<React.SetStateAction<boolean>>
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthCtx = createContext<IAuthCtx>({
  localAuth: true,
  setLocalAuth: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
})

export const AuthCtxProvider: React.FC = ({ children }) => {
  const [localAuth, setLocalAuth] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log(user?.uid)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthCtx.Provider
      value={{ localAuth, setLocalAuth, openDrawer, setOpenDrawer }}
    >
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuthCtx = () => useContext(AuthCtx)
