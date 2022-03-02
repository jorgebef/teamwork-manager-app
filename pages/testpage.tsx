import { Button, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import SignInBtn from '../components/CustomBtn'

const TestPage: React.FC = () => {
  return (
    <>
      <Typography variant='h4'>This is the Test page!</Typography>
      <Button type='button' variant='contained'>
        Server Side Rendered Button
      </Button>
      <SignInBtn>kekwwwww</SignInBtn>
    </>
  )
}

export const getServerSideProps = (ctx: GetServerSideProps) => {
  return {
    props: {},
  }
}

export default TestPage
