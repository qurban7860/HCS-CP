import { useState } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useSettingContext } from 'component/setting'
import { Grid, Box, Typography, Tabs, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText } from 'theme/style'
import { FormHeader, ViewFormField } from 'component'
import { LABEL, VIEW_FORM, VARIANT, DIV_ROLE, KEY, FLEX, FLEX_DIR } from 'constant'
import { StyledSiteTab, StyledSiteTabs, StyledSiteTabBox } from '../style'
import SiteTab from './tab'
import { a11yProps } from './util'

function TabPanel({ children, value, index, ...other }) {
  return (
    <m.div role={DIV_ROLE.TAB_PANEL} hidden={value !== index} {...a11yProps(index)} {...other}>
      {value === index && <Box>{children}</Box>}
    </m.div>
  )
}

const MachineSiteWidget = ({ value, isLoading }) => {
  const [tab, setTab] = useState(1)
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  const { TYPOGRAPHY } = VARIANT
  const { ADDRESS, MACHINE } = VIEW_FORM
  const { INSTALLATION, BILLING } = LABEL.SCHEMA.SITE

  return (
    <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper" sx={{ height: '700px' }}>
        <FormHeader label={LABEL.SITE} />

        <StyledSiteTabBox>
          <StyledSiteTabs value={tab} onChange={handleChange} variant={VARIANT.FULL_WIDTH} centered>
            <StyledSiteTab label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{INSTALLATION}</Typography>} {...a11yProps(1)} mode={themeMode} />
            <StyledSiteTab label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{BILLING}</Typography>} {...a11yProps(2)} mode={themeMode} />
          </StyledSiteTabs>
        </StyledSiteTabBox>
        <TabPanel value={1} index={1} hidden={tab !== 1}>
          <SiteTab value={value} isLoading={isLoading} isBilling={false} />
        </TabPanel>
        <TabPanel value={2} index={2} hidden={tab !== 2}>
          <SiteTab value={value} isLoading={isLoading} isBilling />
        </TabPanel>
      </Grid>
    </Grid>
  )
}

MachineSiteWidget.propTypes = {
  value: PropTypes.object,
  isLoading: PropTypes.bool
}

export default MachineSiteWidget
