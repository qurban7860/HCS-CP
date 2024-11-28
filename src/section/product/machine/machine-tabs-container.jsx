import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext, useResponsive } from 'hook'
import { Typography, tabsClasses } from '@mui/material'
import { GStyledSpanBox, GStyledTabBox, GStyledTab } from 'theme/style'
import { BackButton, TabContainer } from 'component'
import { TABS } from 'section/product/machine'
import { TYPOGRAPHY } from 'constant'
import { a11yProps } from 'util/a11y.js'
import 'swiper/css'

const MachineTabsContainer = ({ value, renderedTab, disableTab, navigatePage, isLoading }) => {
 const { themeMode } = useSettingContext()
 const isMobile = useResponsive('down', 'sm')

 return (
  <Fragment>
   <GStyledSpanBox gap={2}>
    <GStyledTabBox>
     <TabContainer tabsClasses={tabsClasses.scrollButtons} currentTab={renderedTab} setCurrentTab={tab => navigatePage(tab)}>
      <BackButton alongTab />
      {TABS(value).map(tab => (
       <GStyledTab
        className='tab'
        mode={themeMode}
        key={tab.id}
        value={tab.id}
        disabled={tab.disabled}
        label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{tab.label}</Typography>}
        // icon={<Icon icon={tab.icon} />}
        {...a11yProps(tab.id)}
       />
      ))}
     </TabContainer>
    </GStyledTabBox>
   </GStyledSpanBox>
  </Fragment>
 )
}

MachineTabsContainer.propTypes = {
 value: PropTypes.object,
 renderedTab: PropTypes.number,
 disableTab: PropTypes.bool,
 navigatePage: PropTypes.func,
 isLoading: PropTypes.bool
}

export default MachineTabsContainer
