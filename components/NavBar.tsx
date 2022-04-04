import React, { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import Link from 'next/link'
import Image from 'next/image'
import SignInBtn from './SignInBtn'
import DrawerToggleBtn from './DrawerToggleBtn'
import { useAuthCtx } from './../context/AuthCtx'
import profile3 from '../public/profile3.jpg'
import logoSVG from '../public/logo.svg'

const NavBar: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { user, logout } = useAuthCtx()
  const theme = useTheme()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSignOut = () => {
    setAnchorElUser(null)
    logout()
  }

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{ zIndex: theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth='xl'>
        <Toolbar
          variant='regular'
          sx={{ justifyContent: 'space-between' }}
          disableGutters
        >
          <Box
            sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 3 }}
          >
            <DrawerToggleBtn />

            <Link href='/' passHref>
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  maxWidth: '70%',
                }}
              >
                <Image src={logoSVG} alt='logo' />
              </Box>
            </Link>
          </Box>

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Account'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ height: 50, width: 50 }}>
                    <Image
                      alt={user.displayName ? user.displayName : undefined}
                      src={user.photoURL ? user.photoURL : profile3}
                      layout='fill'
                      quality={20}
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: 8,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={'signout'} onClick={handleSignOut}>
                  <ListItemIcon>
                    <Logout fontSize='small' color='error' />
                  </ListItemIcon>
                  <Typography textAlign='center'>Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Sign In'>
                <SignInBtn>Sign In</SignInBtn>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar
