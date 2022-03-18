import { AppBar, Box, Container, useTheme } from '@mui/material'

const Footer = () => {
  const theme = useTheme()


  return (
    <footer>
      <Box
        sx={{
          backgroundColor: theme.palette.grey[200],
          zIndex: theme.zIndex.drawer + 3,
          justifyContent: 'center',
          // width: "100%",
          // position: "absolute",
          // bottom: 0
        }}
      >
        Footer goasdfasdfes here aldfjkslkj lakdsjf ladksjg lakdgj aldgksjasdgklj lagjalg
      </Box>
    </footer>
  )

}

export default Footer
