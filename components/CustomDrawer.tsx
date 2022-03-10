import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Drawer,
  Toolbar,
} from '@mui/material'
import {
  InboxRounded,
  MailRounded,
  GroupsRounded,
  FolderRounded,
  AssignmentRounded,
} from '@mui/icons-material'
import { useDrawerCtx } from '../context/DrawerCtx'
import toggleDrawer from '../util/toggleDrawer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthCtx } from '../context/AuthCtx'

type LinkListItemT = {
  title: string
  path: string
  icon: React.ReactElement
}

const linkList: LinkListItemT[] = [
  {
    title: 'Teams',
    path: '/teams',
    icon: <GroupsRounded />,
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <FolderRounded />,
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <AssignmentRounded />,
  },
]

const DrawerList = () => {
  const router = useRouter()

  return (
    <>
      <Toolbar />
      <List>
        {linkList.map(({ title, path, icon }) => (
          <Link href={path} passHref>
            <ListItem
              sx={
                router.asPath === path
                  ? {
                      backgroundColor: theme => theme.palette.grey[300],
                    }
                  : null
              }
              button
              key={title}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Test 1', 'Test 2', 'Test 3'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxRounded /> : <MailRounded />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

const TempDrawer = () => {
  const { open, setOpen } = useDrawerCtx()

  return (
    <SwipeableDrawer
      anchor='left'
      open={open}
      onClose={toggleDrawer(false, setOpen)}
      onOpen={toggleDrawer(true, setOpen)}
      sx={{
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Box
        sx={{ width: 240 }}
        role='presentation'
        onClick={toggleDrawer(false, setOpen)}
        onKeyDown={toggleDrawer(false, setOpen)}
      >
        <DrawerList />
      </Box>
    </SwipeableDrawer>
  )
}

const PermanentDrawer = () => {
  const drawerWidth = 240

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        display: { xs: 'none', md: 'flex' },
        //position: "relative"
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <DrawerList />
      </Box>
    </Drawer>
  )
}

const CustomDrawer: React.FC = () => {
  const { auth } = useAuthCtx()

  if (!auth) return null

  return (
    <>
      <TempDrawer />
      <PermanentDrawer />
    </>
  )
}

export default CustomDrawer
