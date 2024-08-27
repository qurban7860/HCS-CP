import { Fragment } from 'react'
import { m, useScroll, useSpring } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { GStyledContainer } from 'theme/style'
import { useSettingContext } from 'hook'
import Main from './main'
import Header, { Navbar } from './header'
import { SZ } from 'constant'

function DashboardLayout() {
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  // KEEP: for future use
  // const isDesktop = useResponsive('up', 'lg')
  const { scrollYProgress } = useScroll()

  // [HouseKeeping] Progress Bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX
      }}
    />
  )

  return (
    <Fragment>
      {progress}
      <Header />
      <GStyledContainer maxWidth={SZ.XL} themeMode={themeMode}>
        <Navbar />
        <Main>
          <Outlet />
        </Main>
      </GStyledContainer>
    </Fragment>
  )
}

export default DashboardLayout
