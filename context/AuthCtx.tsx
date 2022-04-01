import nookies from 'nookies'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInAnonymously,
  UserCredential,
  User,
  signOut,
  signInWithPopup,
} from 'firebase/auth'
import { auth, db, googleProvider } from '../firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'

export interface IAuthCtx {
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<any>>
  loginAnon: () => Promise<UserCredential>
  logout: () => void
  // loginAnon: () => Promise<any>
  loginGoogle: () => void
}

export const AuthCtx = createContext<IAuthCtx>({} as IAuthCtx)

export const AuthCtxProvider: React.FC = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    return auth.onIdTokenChanged(async user => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
      } else {
        const token = await user.getIdToken()
        setUser(user)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    })
  }, [])

  const loginAnon = async () => {
    return await signInAnonymously(auth)
  }

  const loginGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then(async res => {
        const userDocRef = doc(db, 'users', res.user.uid)
        const userSnap = await getDoc(userDocRef)

        if (userSnap.exists()) {
          console.log('Existing user: ' + res.user.email)
        } else {
          await setDoc(userDocRef, {
            uid: res.user.uid,
            userName: res.user.displayName,
            email: res.user.email,
            profilePic: res.user.photoURL,
            assignedTasks: [],
            createdTasks: [],
            teams: [],
          })
        }
        setUser(res.user)
      })
      .catch(err => console.log('error: ' + err))
  }

  const logout = async () => {
    await router.push('/')
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthCtx.Provider
      value={{
        openDrawer,
        setOpenDrawer,
        user,
        setUser,
        loginAnon,
        logout,
        loginGoogle,
      }}
    >
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuthCtx = () => useContext(AuthCtx)
