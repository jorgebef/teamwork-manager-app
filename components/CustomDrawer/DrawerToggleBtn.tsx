import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useDrawerCtx } from '../../context/DrawerCtx'
import { useAuthCtx } from '../../context/AuthCtx'
import toggleDrawer from './toggleDrawer'

const DrawerToggleBtn = () => {
  const { auth, setAuth } = useAuthCtx()
  const { open, setOpen } = useDrawerCtx()

  return (
    <Box
      sx={{ flexGrow: 0, display: auth ? { xs: 'flex', md: 'none' } : 'none' }}
    >
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={toggleDrawer(true, setOpen)}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
    </Box>
  )
}

export default DrawerToggleBtn
