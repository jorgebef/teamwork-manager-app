import { Box, Container } from '@mui/material'
import CustomDrawer from './CustomDrawer'
import NavBar from './NavBar'
import AlertCustom from './AlertCustom'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
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
        <Container>{children}</Container>
      </Box>
      <AlertCustom />
    </>
  )
}

export default Layout
