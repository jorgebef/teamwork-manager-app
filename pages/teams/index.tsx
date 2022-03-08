import {
  Avatar,
  AvatarGroup,
  Card,
  Container,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import profile1 from '../../public/profile1.jpg'
import profile2 from '../../public/profile2.jpg'
import profile3 from '../../public/profile3.jpg'

const Teams: NextPage = () => {
  const theme = useTheme()

  return (
    <Link href='/dashboard' passHref>
      <Card
        // elevation={0}
        variant='outlined'
        sx={{
          cursor: 'pointer',
          p: 3,
          transitionProperty: 'all',
          transitionDuration: theme.transitions.duration.short,
          transitionTimingFunction: theme.transitions.easing.easeInOut,
          // borderRadius: t => t.shape.borderRadius,
          '&:hover': {
            backgroundColor: theme.palette.grey[100],
          },
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'inherit',
          }}
        >
          <Typography variant='h4'>Team Name</Typography>
          <AvatarGroup total={10}>
            <Avatar>
              <Image src={profile1} quality={20} />
            </Avatar>
            <Avatar>
              <Image src={profile2} quality={20} />
            </Avatar>
            <Avatar>
              <Image src={profile3} quality={20} />
            </Avatar>
          </AvatarGroup>
        </Container>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Container sx={{ display: 'flex' }}>
          <Typography variant='body1'>Team description</Typography>
        </Container>
      </Card>
    </Link>
  )
}

export default Teams
