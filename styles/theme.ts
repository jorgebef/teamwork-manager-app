import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'
import { Theme } from '@mui/system'

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#55acd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiMenu: {
      defaultProps: {
        elevation: 1,
      },
    },
  },
  typography: {
    h3: {
      fontWeight: 500,
    },
  },
})

export default theme
