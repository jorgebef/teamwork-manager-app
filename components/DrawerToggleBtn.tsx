import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuthCtx } from '../context/AuthCtx'
import toggleDrawer from '../util/toggleDrawer'
import { CloseRounded } from '@mui/icons-material'
import { useRouter } from 'next/router'

const DrawerToggleBtn = () => {
  const { localAuth, openDrawer, setOpenDrawer  } = useAuthCtx()

  return (
    <Box
      sx={{
        flexGrow: 0,
        display:
          localAuth && useRouter().asPath !== '/'
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
