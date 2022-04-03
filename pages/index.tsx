import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  useTheme,
} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const Home: NextPage = () => {
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>Teamwork Manager - Home</title>
        <meta
          name='description'
          content='Team project and task management app'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
          }}
        >
          <Typography fontWeight={500} sx={{ fontSize: { xs: 35, sm: 55 } }}>
            Team manager app
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Card>
              <CardMedia
                component='img'
                alt='kitty'
                height={250}
                src='https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2360&q=80'
              />
              <CardContent>
                <Typography>
                  This is a sample of what should be in the index page
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardMedia
                component='img'
                alt='kitty'
                height={250}
                src='https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80'
              />
              <CardContent>
                <Typography>
                  There is no such thing as too many cats on a website!!
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardMedia
                component='img'
                alt='kitty'
                height={250}
                src='https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2360&q=80'
              />
              <CardContent>
                <Typography>
                  This is a sample of what should be in the index page
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </main>
    </>
  )
}

export default Home
