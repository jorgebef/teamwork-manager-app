import React from 'react'
import { useAuthCtx } from '../../context/AuthCtx'
import { PermanentDrawer, TempDrawer } from './Drawers'

const CustomDrawer: React.FC = () => {
  const { auth } = useAuthCtx()

  return (
    <>
      {auth ? (
        <>
          <TempDrawer />
          <PermanentDrawer />
        </>
      ) : null}
    </>
  )
}

export default CustomDrawer
