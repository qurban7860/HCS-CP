import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { Typography, tabsClasses } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GStyledSpanBox, GStyledTabBox, GStyledTab } from 'theme/style'
import { BackButton, TabContainer } from 'component'
import { TABS } from 'section/product/machine'
import { TYPOGRAPHY } from 'constant'
import { a11yProps } from 'util/a11y.js'
import 'swiper/css'

const MachineTabsContainer = ({ value, renderedTab, disableTab, navigatePage, isLoading }) => {
  const { themeMode } = useSettingContext()

  return (
    <GStyledSpanBox gap={2}>
      <BackButton alongTab />
      <GStyledTabBox>
        <TabContainer tabsClasses={tabsClasses.scrollButtons} currentTab={renderedTab} setCurrentTab={(tab) => navigatePage(tab)}>
          {TABS(value).map((tab) => (
            <GStyledTab
              className="tab"
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
  )
}

export default MachineTabsContainer
