import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useResponsive } from 'hook'
import { useSettingContext } from 'component/setting'
import { GLOBAL } from 'global'
import Main from './main'
import Header from './header'
import { Navbar } from './nav'

function DashboardLayout() {
  const { themeLayout } = useSettingContext()
  const isDesktop = useResponsive('up', 'lg')
  const [open, setOpen] = useState(false)

  // NOTE: keep it implemented like this for now, just in case we implement layout switching
  const isNavHorizontal = themeLayout === 'horizontal'

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderNavVertical = <Navbar openNav={open} onCloseNav={handleClose} />
  const bgcolor = GLOBAL.VERSION_COLOR
  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />
        <Navbar />
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
        <Navbar />
        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  )
}

export default DashboardLayout
