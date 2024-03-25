import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { GStyledContainer } from 'theme/style'
import { useSettingContext } from 'component/setting'
import Main from './main'
import Header from './header'
import { Navbar } from './nav'

function DashboardLayout() {
  const { themeMode } = useSettingContext()
  // KEEP: for future use
  // const isDesktop = useResponsive('up', 'lg')

  return (
    <Fragment>
      <Header />
      <GStyledContainer maxWidth="xl" themeMode={themeMode}>
        <Navbar />
        <Main>
          <Outlet />
        </Main>
      </GStyledContainer>
    </Fragment>
  )
}

export default DashboardLayout
