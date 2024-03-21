import { useLocation, Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Footer from './footer'
import Header from './header'

export default function MainLayout() {
  const { pathname } = useLocation()

  const isHome = pathname === '/'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
