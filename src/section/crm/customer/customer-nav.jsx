import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router-dom'
import { useSettingContext, ICON_NAME } from 'hook'
import { PATH_CUSTOMER, PATH_DASHBOARD } from 'route/path'
import { Tab, tabsClasses, Grid, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { SvgFlagIcon, IconTooltip, BackButton, ViewFormField, BadgeCardMedia, TabContainer } from 'component'
import { StyledTabBox, StyledTab, a11yProps, TABS } from 'section/crm/customer'
import { KEY, TYPOGRAPHY, VARIANT, LABEL, FLEX, FLEX_DIR, VIEW_FORM } from 'constant'
import { truncate } from 'util'

const CustomerNav = ({ renderedTab, navigatePage, value, isLoading }) => {
  // const [renderedTab, setRenderedTab] = useState(0)
  const theme = useTheme()
  const navigate = useNavigate()
  const { themeMode } = useSettingContext()
  const { id } = useParams()

  // const navigatePage = (tab) => {
  //   if (tab === 0 && id) {
  //     setRenderedTab(0)
  //   } else if (tab === 1 && id) {
  //     setRenderedTab(1)
  //   } else if (tab === 2 && id) {
  //     setRenderedTab(2)
  //   } else if (tab === 3 && id) {
  //     setRenderedTab(3)
  //   }
  // }

  // const handleRenderedTab = () => {
  //   if (id) {
  //     if (renderedTab === 0) {
  //       return `${PATH_CUSTOMER}/${id}`
  //     } else if (renderedTab === 1) {
  //       return `${PATH_CUSTOMER}/${id}/contact`
  //     } else if (renderedTab === 2) {
  //       return `${PATH_CUSTOMER}/${id}/machine`
  //     } else if (renderedTab === 3) {
  //       return `${PATH_CUSTOMER}/${id}/audit`
  //     }
  //   } else {
  //     return PATH_DASHBOARD
  //   }
  // }

  return (
    <GStyledHeaderCardContainer>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container px={1.5}>
        <Grid item lg={8}>
          <GStyledSpanBox my={2}>
            <BadgeCardMedia />
            <ViewFormField variant={VARIANT.TYPOGRAPHY.H4} heading={VIEW_FORM.ORGANIZATION} isLoading={isLoading} isMachineView>
              {truncate(value?.name, 50)}
            </ViewFormField>
          </GStyledSpanBox>
        </Grid>
        <Grid item lg={4}>
          <Grid container justifyContent={FLEX.FLEX_END} flexDirection={FLEX_DIR.COLUMN} alignContent={FLEX.FLEX_END}>
            <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
              <Grid container justifyContent={FLEX.FLEX_END} gap={1} alignItems={KEY.CENTER}>
                <SvgFlagIcon
                  country={value?.country}
                  color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.bronze}
                  dimension={24}
                />

                {value?.isActive ? (
                  <IconTooltip
                    title={LABEL.ACTIVE}
                    icon={ICON_NAME.ACTIVE}
                    color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                  />
                ) : (
                  <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} px={2}>
        <GStyledSpanBox gap={2}>
          <BackButton alongTab />
          <StyledTabBox>
            <TabContainer tabsClasses={tabsClasses.scrollButtons} currentTab={renderedTab} setCurrentTab={(tab) => navigatePage(tab)}>
              {TABS.map((tab) => (
                <StyledTab
                  mode={themeMode}
                  key={tab.id}
                  value={tab.id}
                  disabled={tab.disabled}
                  label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{tab.label}</Typography>}
                  {...a11yProps(tab.id)}
                />
              ))}
            </TabContainer>
          </StyledTabBox>
        </GStyledSpanBox>
      </Grid>
    </GStyledHeaderCardContainer>
  )
}

CustomerNav.propTypes = {
  current: PropTypes.number,
  value: PropTypes.any,
  isLoading: PropTypes.bool
}

export default CustomerNav
