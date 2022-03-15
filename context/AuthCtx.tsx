import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInAnonymously,
  UserCredential,
  User,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config'

export interface IAuthCtx {
  localAuth: boolean
  setLocalAuth: React.Dispatch<React.SetStateAction<boolean>>
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<any>>
  login: () => Promise<UserCredential>
  logout: () => void
}

export const AuthCtx = createContext<IAuthCtx>({} as IAuthCtx)

// export const AuthCtx = createContext<IAuthCtx>({
//   localAuth: true,
//   setLocalAuth: () => {},
//   openDrawer: false,
//   setOpenDrawer: () => {},
//   user: null,
//   setUser: () => {},
// })

export const AuthCtxProvider: React.FC = ({ children }) => {
  const [localAuth, setLocalAuth] = useState<boolean>(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      console.log(user?.uid)
    })
    return unsubscribe()
  }, [])

  const login = async () => {
    return await signInAnonymously(auth)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthCtx.Provider
      value={{
        localAuth,
        setLocalAuth,
        openDrawer,
        setOpenDrawer,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuthCtx = () => useContext(AuthCtx)
