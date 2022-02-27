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
}

const CustomBtn: React.FC<IStyledEmotionButtonProps> = ({ text, children }) => {
  const kekw = true
  return (
    <Button
      sx={{
        border: kekw ? '5px solid': '9px solid',
        // code below is shorthand for this:
        // borderColor: theme => theme.palette.secondary.dark
        borderColor: 'secondary.dark',
      }}
      type='button'
      variant='contained'
    >
      {children}
    </Button>
  )
}

export default CustomBtn
