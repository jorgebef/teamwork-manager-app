import { createContext, useContext, useState } from 'react'

export interface IAuthCtx {
  auth: boolean
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthCtx = createContext<IAuthCtx>({
  auth: true,
  setAuth: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
})

export const AuthCtxProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)

  return (
    <AuthCtx.Provider value={{ auth, setAuth, openDrawer, setOpenDrawer }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuthCtx = () => useContext(AuthCtx)
