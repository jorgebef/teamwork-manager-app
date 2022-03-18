import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInAnonymously,
  UserCredential,
  User,
  signOut,
  signInWithPopup,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase/config'
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config'

export interface IAuthCtx {
  localAuth: boolean
  setLocalAuth: React.Dispatch<React.SetStateAction<boolean>>
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<any>>
  login: () => Promise<UserCredential>
  logout: () => void
  loginAnon: () => Promise<any>
  loginGoogle: () => void
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
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        // setUser(null)
        signInAnonymously(auth).catch(err => {
          console.log(err)
        })
      }
      console.log(user?.uid)
    })
    return unsubscribe()
  }, [])

  const login = async () => {
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

  const loginAnon = async () => {
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
        loginAnon,
        loginGoogle,
      }}
    >
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuthCtx = () => useContext(AuthCtx)
