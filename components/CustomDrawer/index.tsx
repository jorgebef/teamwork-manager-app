import React from 'react'
import { useAuthCtx } from '../../context/AuthCtx'
import PermanentDrawer from './PermanentDrawer'
import TempDrawer from './TempDrawer'

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
