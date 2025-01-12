import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Typography, tabsClasses } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { BackButton, TabContainer } from 'component'
import { TABS, a11yProps } from 'section/crm/customer'
import { TYPOGRAPHY } from 'constant'
import { StyledTabBox, StyledTab } from './style'
import 'swiper/css'

const CustomerTabsContainer = ({ value, renderedTab, disableTab, navigatePage }) => {
 const { themeMode } = useSettingContext()

 return (
  <GStyledSpanBox gap={2}>
   <StyledTabBox>
    <TabContainer tabsClasses={tabsClasses} currentTab={renderedTab} setCurrentTab={tab => navigatePage(tab)}>
     <BackButton alongTab />
     {TABS(value).map(tab => (
      <StyledTab
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
   </StyledTabBox>
  </GStyledSpanBox>
 )
}

CustomerTabsContainer.propTypes = {
 value: PropTypes.object,
 renderedTab: PropTypes.number,
 disableTab: PropTypes.bool,
 navigatePage: PropTypes.func
}

export default CustomerTabsContainer
