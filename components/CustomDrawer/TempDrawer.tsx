import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'
import React from 'react'
import { useDrawerCtx } from '../../context/DrawerCtx'
import toggleDrawer from './toggleDrawer'

const TempDrawer = () => {
  const { open, setOpen } = useDrawerCtx()

  return (
    <SwipeableDrawer
      anchor='left'
      open={open}
      onClose={toggleDrawer(false, setOpen)}
      onOpen={toggleDrawer(true, setOpen)}
      sx={{
        zIndex: theme => theme.zIndex.drawer + 2,
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={toggleDrawer(false, setOpen)}
        onKeyDown={toggleDrawer(false, setOpen)}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? 'KEKW' : 'LAWL'}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                {index % 2 === 0 ? 'KEKW' : 'LAWL'}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}

export default TempDrawer
