import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuthCtx } from '../context/AuthCtx'
import toggleDrawer from '../util/toggleDrawer'
import { CloseRounded } from '@mui/icons-material'

const DrawerToggleBtn = () => {
  const {  user, openDrawer, setOpenDrawer } = useAuthCtx()

  return (
    <Box
      sx={{
        flexGrow: 0,
        display:
          // -------------------- LOCAL USER
          // localAuth && useRouter().asPath !== '/'
          // user && useRouter().asPath !== '/'
          user 
            ? { xs: 'flex', md: 'none' }
            : 'none',
      }}
    >
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={toggleDrawer(!openDrawer, setOpenDrawer)}
        color='inherit'
      >
        {openDrawer ? <CloseRounded /> : <MenuIcon />}
      </IconButton>
    </Box>
  )
}

export default DrawerToggleBtn
