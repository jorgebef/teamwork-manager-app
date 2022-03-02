import styled from '@emotion/styled'
import { Button } from '@mui/material'

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

interface IStyledEmotionButtonProps {
  text?: string
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const SignInBtn: React.FC<IStyledEmotionButtonProps> = ({
  setAuth,
  children,
}) => {
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
      onClick={() => setAuth(true)}
    >
      {children}
    </Button>
  )
}

export default SignInBtn
