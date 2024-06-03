import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { GStyledContainer } from 'theme/style'
import { useSettingContext } from 'hook'
import Main from './main'
import Header, { Navbar } from './header'

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
