import React from 'react'
import Footer from '../Footer/Footer'

const Layout = ({ className, children }) => {
  return (
    <>
      <main className={className}>
        {children}
      </main>
      <Footer/>
    </>
  )
}
 
export default Layout