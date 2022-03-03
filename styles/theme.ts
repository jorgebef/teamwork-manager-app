import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'
import { Theme } from '@mui/system'

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A700,
    },
  },
})

export default theme
