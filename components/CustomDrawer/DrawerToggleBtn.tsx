import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useDrawerCtx } from '../../context/DrawerCtx'
import { useAuthCtx } from '../../context/AuthCtx'
import toggleDrawer from './toggleDrawer'
import { CloseRounded } from '@mui/icons-material'
import {useRouter} from 'next/router'

const DrawerToggleBtn = () => {
  const { auth } = useAuthCtx()
  const { open, setOpen } = useDrawerCtx()

  return (
    <Box
      sx={{ flexGrow: 0, display: auth && useRouter().asPath!=='/'? { xs: 'flex', md: 'none' } : 'none' }}
    >
      <IconButton
        size='large'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={toggleDrawer(!open, setOpen)}
        color='inherit'
      >
        {open ? <CloseRounded /> : <MenuIcon />}
      </IconButton>
    </Box>
  )
}

export default DrawerToggleBtn
