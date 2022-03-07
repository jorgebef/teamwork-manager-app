import { Box, Button, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'

const TestPage: React.FC = () => {
  return (
    <>
      <Typography variant='h3'>Dashboard</Typography>
      <Button type='button' variant='contained'>
        Server Side Rendered Button
      </Button>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
      <Box>alskdjñlaksdjf</Box>
    </>
  )
}

export const getServerSideProps = (ctx: GetServerSideProps) => {
  return {
    props: {},
  }
}

export default TestPage
