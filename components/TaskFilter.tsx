import { SearchRounded } from '@mui/icons-material'
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { useState } from 'react'
import { useAuthCtx } from '../context/AuthCtx'
import { useUserTeams } from '../hooks/teams'
import { useUser } from '../hooks/users'
import { ITask } from '../util/types'

interface TaskFilterProps {
  tasks: ITask[]
  teamFilter: string[]
  setTeamFilter: React.Dispatch<React.SetStateAction<string[]>>
}

const TaskFilter = ({ tasks, teamFilter, setTeamFilter }: TaskFilterProps) => {
  const { user } = useAuthCtx()
  const teams = useUserTeams(user?.uid)

  const TeamFilter = () => {
    const onTeamChange = (e: SelectChangeEvent<string>) => {
      const newVal = e.target.value
      setTeamFilter(typeof newVal === 'string' ? newVal.split(',') : newVal)
    }
    return teams ? (
      <FormControl sx={{ width: '30%' }}>
        <InputLabel id='teamsLabel'>Teams</InputLabel>
        <Select
          labelId='teamsLabel'
          id='teamsLabel'
          multiple
          value={teamFilter}
          onChange={onTeamChange}
          input={<OutlinedInput label='Tag' />}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {teamFilter?.map(tId => (
                <Chip key={tId} label={teams.find(t => t.id === tId)?.name} />
              ))}
            </Box>
          )}
        >
          {teams.map(t => (
            <MenuItem key={t.id} value={t.id}>
              {t.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ) : null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        px: 3,
        my: 3,
      }}
    >
      <TeamFilter />
      <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
        <Input aria-label='Search' placeholder='Search' />
        <IconButton>
          <SearchRounded />
        </IconButton>
      </FormControl>
    </Box>
  )
}

export default TaskFilter
