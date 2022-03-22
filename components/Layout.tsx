import { Box, Container, Typography, useTheme } from '@mui/material'
import CustomDrawer from './CustomDrawer'
import NavBar from './NavBar'
import AlertCustom from './AlertCustom'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthCtx } from '../context/AuthCtx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true)
  const { user, setUser } = useAuthCtx()
  const router = useRouter()
  const theme = useTheme()

  useEffect(() => {
    if (!user && router.asPath !== '/') {
      router.push('/')
    } else {
      setLoggedIn(false)
    }

    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      console.log(user?.uid)
    })
    return unsubscribe()
  }, [router, user, setUser])

  return (
    <>
      <NavBar />
      <Box
        sx={{
          pt: 10,
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        <CustomDrawer />
        <Container
          sx={{
            maxWidth: {
              xs: '100%',
              // md: 'calc(100% - ' + theme.custom.drawer.width + ')',
              md: `calc(100% - ${theme.custom.drawer.width})`,
            },
          }}
        >
          {loggedIn ? <Typography>REDIRECTING TO HOME</Typography> : children}
        </Container>
      </Box>
      <AlertCustom />
    </>
  )
}

export default Layout
