import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button, Container, Divider, useTheme } from '@mui/material'
import { DeleteRounded, EditRounded } from '@mui/icons-material'

const taskList = [
  {
    id: 1,
    title: 'task1',
    desc: 'lorem ipsum lore bla bla bla bla.',
    asigneeUID: 'uuid92304920',
    created: Date.now(),
    dueDate: Date.now(),
    parentProjectId: 1,
  },
  {
    id: 2,
    title: 'task2',
    desc: 'Task 2 description bla bla bla bla bla',
    asigneeUID: 2,
    created: Date.now(),
    dueDate: Date.now(),
    parentProjectId: 2,
  },
]

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState<number | false>(false)
  const theme = useTheme()

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <Container>
      {taskList.map(task => {
        return (
          <Accordion
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
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1bh-content'
              id='panel1bh-header'
            >
              <Typography variant='h6' sx={{ width: '33%', flexShrink: 0 }}>
                {task.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Typography>{task.desc}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    justifySelf: 'flex-end',
                    alignSelf: 'flex-end',
                  }}
                >
                  <Button
                    color='primary'
                    type='button'
                    variant='contained'
                    startIcon={<EditRounded />}
                  >
                    Edit
                  </Button>
                  <Button
                    color='error'
                    type='button'
                    variant='contained'
                    startIcon={<DeleteRounded />}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </Container>
  )
}
