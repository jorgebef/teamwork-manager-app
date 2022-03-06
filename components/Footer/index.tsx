import { Box } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: t => t.palette.grey[200],
        // zIndex: t => t.zIndex.drawer + 3,
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <footer>Footer goes here</footer>
    </Box>
  )
}

export default Footer
