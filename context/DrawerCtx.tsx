import React, { createContext, useContext, useState } from 'react'

export interface IDrawerCtx {
  open: boolean
  // setOpen: (c: boolean) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DrawerCtx = createContext<IDrawerCtx>({
  open: false,
  setOpen: () => {},
})

export const DrawerCtxProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <DrawerCtx.Provider value={{ open, setOpen }}>
      {children}
    </DrawerCtx.Provider>
  )
}

export const useDrawerCtx = () => useContext(DrawerCtx)
