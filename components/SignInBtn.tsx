import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useAuthCtx } from '../context/AuthCtx'

interface IButtonProps {
  backgroundColor?: string
}

const Btn = styled.button<IButtonProps>`
  padding: 32px;
  background-color: ${props => props.backgroundColor};
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

const SignInBtn: React.FC = ({ children }) => {
  const { loginGoogle } = useAuthCtx()

  return (
    <Button
      sx={
        {
          // code below is shorthand for this:
          // borderColor: theme => theme.palette.secondary.dark
          // borderColor: theme => theme.palette.secondary.dark,
          // backgroundColor: t => t.palette.success.main,
        }
      }
      color='success'
      type='button'
      variant='contained'
      // onClick={handleSignIn}
      onClick={loginGoogle}
    >
      {children}
    </Button>
  )
}

export default SignInBtn
