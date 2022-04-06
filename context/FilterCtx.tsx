import { createContext, useContext, useEffect, useState } from 'react'

export interface IFilterCtx {
  teamFilter: string[]
  setTeamFilter: React.Dispatch<React.SetStateAction<string[]>>
}

export const FilterCtx = createContext<IFilterCtx>({} as IFilterCtx)

export const FilterCtxProvider: React.FC = ({ children }) => {
  const [teamFilter, setTeamFilter] = useState<string[]>([])

  useEffect(() => {})

  return (
    <FilterCtx.Provider
      value={{
        teamFilter,
        setTeamFilter,
      }}
    >
      {children}
    </FilterCtx.Provider>
  )
}

export const useFilterCtx = () => useContext(FilterCtx)
