import { Outlet } from 'react-router-dom'
import Nav from './nav'
import Footer from './footer'

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}
