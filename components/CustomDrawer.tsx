import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Drawer,
  useTheme,
  Toolbar,
  Typography,
  Badge,
  Chip,
} from '@mui/material'
import {
  InboxRounded,
  MailRounded,
  GroupsRounded,
  FolderRounded,
  AssignmentRounded,
} from '@mui/icons-material'
import toggleDrawer from '../util/toggleDrawer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuthCtx } from '../context/AuthCtx'
import useTeamArr from '../hooks/useTeamArr'
import useUser from '../hooks/useUser'

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
  // {
  //   title: 'Projects',
  //   path: '/projects',
  //   icon: <FolderRounded />,
  // },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <AssignmentRounded />,
  },
]

const DrawerList = () => {
  const router = useRouter()
  const theme = useTheme()
  const { user } = useAuthCtx()

  const loggedUserId = user ? user.uid : ''
  const userData = useUser(loggedUserId)
  const grabbedTeamsData = useTeamArr(userData.teams)

  return (
    <>
      <Toolbar />
      <List>
        <Link href='/tasks' passHref>
          <ListItem
            sx={
              router.asPath === '/tasks'
                ? {
                    backgroundColor: theme => theme.palette.grey[300],
                  }
                : null
            }
            button
          >
            <ListItemIcon>{<AssignmentRounded />}</ListItemIcon>
            <ListItemText primary='Tasks' />
          </ListItem>
        </Link>
        <Divider />
        <Link href='/teams' passHref>
          <ListItem
            sx={
              router.asPath === '/teams'
                ? {
                    backgroundColor: theme => theme.palette.grey[300],
                  }
                : null
            }
            button
          >
            <ListItemIcon>{<GroupsRounded />}</ListItemIcon>
            <ListItemText primary='Teams' />
          </ListItem>
        </Link>
        {grabbedTeamsData.map(team => {
          return (
            <Link key={team.id} href={`/teams/${team.id}`} passHref>
              <ListItem
                sx={
                  router.asPath === `/teams/${team.id}`
                    ? {
                        backgroundColor: theme.palette.action.hover,
                      }
                    : null
                }
                button
              >
                <ListItemText>
                  <Typography variant='body2' noWrap>
                    {team.name}
                  </Typography>
                </ListItemText>
                <ListItemIcon>
                  <GroupsRounded sx={{ mr: 1 }} />
                  {team.members.length}
                </ListItemIcon>
              </ListItem>
            </Link>
          )
        })}
      </List>
      {/* <List> */}
      {/*   {linkList.map(({ title, path, icon }) => ( */}
      {/*     <Link key={title} href={path} passHref> */}
      {/*       <ListItem */}
      {/*         sx={ */}
      {/*           router.asPath === path */}
      {/*             ? { */}
      {/*                 backgroundColor: theme => theme.palette.grey[300], */}
      {/*               } */}
      {/*             : null */}
      {/*         } */}
      {/*         button */}
      {/*         key={title} */}
      {/*       > */}
      {/*         <ListItemIcon>{icon}</ListItemIcon> */}
      {/*         <ListItemText primary={title} /> */}
      {/*       </ListItem> */}
      {/*     </Link> */}
      {/*   ))} */}
      {/* </List> */}
      {/* <Divider /> */}
    </>
  )
}

const TempDrawer = () => {
  const { openDrawer, setOpenDrawer } = useAuthCtx()

  return (
    <SwipeableDrawer
      anchor='left'
      open={openDrawer}
      onClose={toggleDrawer(false, setOpenDrawer)}
      onOpen={toggleDrawer(true, setOpenDrawer)}
      sx={{
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Box
        sx={{ width: 240 }}
        role='presentation'
        onClick={toggleDrawer(false, setOpenDrawer)}
        onKeyDown={toggleDrawer(false, setOpenDrawer)}
      >
        <DrawerList />
      </Box>
    </SwipeableDrawer>
  )
}

const PermanentDrawer = () => {
  const theme = useTheme()

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: theme.custom.drawer.width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: theme.custom.drawer.width,
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
  const { user } = useAuthCtx()

  // if (!localAuth) return null
  if (!user) return null

  return (
    <>
      <TempDrawer />
      <PermanentDrawer />
    </>
  )
}

export default CustomDrawer
