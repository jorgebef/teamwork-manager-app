import { Container } from '@mui/material'
import CustomDrawer from '../CustomDrawer'
import { DrawerCtxProvider } from '../../context/DrawerCtx'
import NavBar from '../NavBar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
      <DrawerCtxProvider>
        <NavBar />
        <Container
          sx={{
            pt: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CustomDrawer />
          {children}
        </Container>
      </DrawerCtxProvider>
  )
}

export default Layout
