import { Box, Container, useTheme } from '@mui/material'
import CustomDrawer from './CustomDrawer'
import NavBar from './NavBar'
import AlertCustom from './AlertCustom'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme()

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
            width: {
              xs: '100%',
              md: `calc(100% - ${theme.custom.drawer.width})`,
            },
            maxWidth: theme.breakpoints.values.lg,
          }}
        >
          {children}
        </Container>
      </Box>
      <AlertCustom />
    </>
  )
}

export default Layout
