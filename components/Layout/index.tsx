import React from 'react'
import NavBar from '../NavBar'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
