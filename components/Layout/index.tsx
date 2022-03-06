import { Box, Container } from '@mui/material'
import CustomDrawer from '../CustomDrawer'
import { DrawerCtxProvider } from '../../context/DrawerCtx'
import NavBar from '../NavBar'
import Footer from '../Footer'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DrawerCtxProvider>
        <NavBar />
        <Container
          sx={{
            pt: 10,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: '100vh',
            boxSizing: 'border-box',
          }}
        >
          <CustomDrawer />
          {children}
        </Container>

        {/* Footer is not appearing on top of the Container above!!!! */}
        <Footer />
        {/* Footer is not appearing on top of the Container above!!!! */}
      </DrawerCtxProvider>
    </>
  )
}

export default Layout
