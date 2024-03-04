import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useResponsive } from 'hook'
import { useSettingsContext } from 'component/setting'
import { CONFIG } from 'global'
import Main from './main'
import Header from './header'
import NavMini from './nav/nav-mini'
import NavVertical from './nav/nav-vertical'
import NavHorizontal from './nav/nav-horizontal'

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { themeLayout } = useSettingsContext()
  const isDesktop = useResponsive('up', 'lg')
  const [open, setOpen] = useState(false)
  const isNavHorizontal = themeLayout === 'horizontal'
  const isNavMini = themeLayout === 'mini'

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />
  const bgcolor = CONFIG.Background_Color
  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} sx={{ backgroundColor: bgcolor }} />
        {isDesktop ? <NavHorizontal /> : renderNavVertical}
        <Main>
          <Outlet />
        </Main>
      </>
    )
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} sx={{ backgroundColor: bgcolor }} />
        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
      </>
    )
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />
      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  )
}
