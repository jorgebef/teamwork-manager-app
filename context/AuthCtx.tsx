import { createContext, useContext, useState } from 'react'

export interface IAuthCtx {
  auth: boolean
  // setAuth: (a: boolean) => void
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthCtx = createContext<IAuthCtx>({
  auth: true,
  setAuth: () => {},
})

export const AuthCtxProvider: React.FC = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false)

  return (
    <AuthCtx.Provider value={{ auth, setAuth }}>{children}</AuthCtx.Provider>
  )
}

export const useAuthCtx = () => useContext(AuthCtx)
