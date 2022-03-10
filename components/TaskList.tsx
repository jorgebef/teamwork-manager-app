import { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  useTheme,
} from '@mui/material'
import {
  ExpandMoreRounded,
  DeleteRounded,
  EditRounded,
  FlagRounded,
} from '@mui/icons-material'
import { ITask } from '../util/types'
import moment from 'moment'
import { styled } from '@mui/system'
import Image from 'next/image'
import profile2 from '../public/profile1.jpg'
import TaskForm from './TaskForm'

interface ITaskListProps {
  tasks: ITask[]
}

const TaskList = ({ tasks }: ITaskListProps) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  const [open, setOpen] = useState(false)
  const theme = useTheme()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleChange =
    (panel: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const CustomRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
  })

  return (
    <Container>
      {tasks.map(task => {
        return (
          <Accordion
            key={task.id}
            expanded={expanded === task.id}
            onChange={handleChange(task.id)}
            elevation={0}
            sx={{
              backgroundColor:
                expanded === task.id ? theme.palette.grey[100] : null,
              // my: 2
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRounded />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography
                noWrap={expanded === task.id ? false : true}
                variant='h5'
                sx={{ width: '33%', flexShrink: 0 }}
              >
                {task.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                '&:hover': {
                  // Buttons will appear once the expanded accordion is hovered
                  '& Button': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Typography fontWeight={400}>{task.description}</Typography>

                <CustomRow>
                  <FlagRounded color='warning' />
                  <Typography fontWeight={700}>
                    {moment(task.dueDate).format('MMM do, yyyy')}
                  </Typography>
                </CustomRow>

                <CustomRow>
                  <Avatar sx={{ width: 35, height: 35 }}>
                    <Image alt='user1' src={profile2} quality={20} />
                  </Avatar>
                  <Typography fontWeight={700}>{task.asignee}</Typography>
                </CustomRow>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    justifySelf: 'flex-end',
                    alignSelf: 'flex-end',
                  }}
                >
                  {/* <TaskForm task={task} /> */}
                  <Button
                    color='primary'
                    onClick={handleOpen}
                    type='button'
                    variant='contained'
                    startIcon={<EditRounded />}
                    sx={{ opacity: 0 }}
                  >
                    Edit
                  </Button>
                  <Button
                    color='error'
                    type='button'
                    variant='contained'
                    startIcon={<DeleteRounded />}
                    sx={{ opacity: 0 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
            <TaskForm task={task} open={open} setOpen={setOpen} />
          </Accordion>
        )
      })}
    </Container>
  )
}

export default TaskList
