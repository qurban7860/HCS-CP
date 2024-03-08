import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useResponsive } from 'hook'
import { useSettingContext } from 'component/setting'
import { GLOBAL } from 'global'
import Main from './main'
import Header from './header'
import NavMini from './nav/nav-mini'
import NavHorizontal from './nav/nav-horizontal'
import NavVertical from './nav/nav-vertical'

function DashboardLayout() {
  const { themeLayout } = useSettingContext()
  const isDesktop = useResponsive('up', 'lg')
  const [open, setOpen] = useState(false)
  const isNavHorizontal = themeLayout === 'horizontal'

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderNavVertical = <NavHorizontal openNav={open} onCloseNav={handleClose} />
  const bgcolor = GLOBAL.VERSION_COLOR
  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />
        <NavHorizontal />
        <Main>
          <Outlet />
        </Main>
      </>
    )
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />
      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { sm: 1 },
        }}
      >
        <NavHorizontal />

        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  )
}

export default DashboardLayout
