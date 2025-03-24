import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext, ICON_NAME } from 'hook'
import { useMediaQuery, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox } from 'theme/style'
import { SvgFlagIcon, IconTooltip, BadgeCardMedia, TextIconListItem } from 'component'
import { KEY, LABEL, FLEX, FLEX_DIR, TYPOGRAPHY } from 'constant'

const HomeNav = ({ value, isLoading }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 const renderStatusIcons = () => (
  <Grid
   container
   justifyContent={FLEX.FLEX_END}
   gap={isMobile ? 0.5 : 2}
   sx={{
    flexWrap: 'wrap',
    alignItems: KEY.CENTER
   }}>
   <SvgFlagIcon country={value?.country} color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.bronze} dimension={isMobile ? 15 : 20} />
   {value?.isActive ? (
    <IconTooltip
     title={t('active.label')}
     icon={ICON_NAME.ACTIVE}
     color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
     isActiveIcon
     iconOnly
     dimension={isMobile ? 15 : 20}
    />
   ) : (
    <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={isMobile ? 15 : 20} />
   )}
  </Grid>
 )

 return (
  <Fragment>
   <GStyledHeaderCardContainer height={120}>
    <GStyledTopBorderDivider mode={themeMode} />
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN} px={isMobile ? 1 : 1.5}>
     <Grid container flexDirection={FLEX_DIR.ROW} p={2}>
      <Grid item xs={8} md={8} display={FLEX.FLEX} alignItems={KEY.CENTER} mt={2}>
       <GStyledSpanBox gap={1} mb={1}>
        <BadgeCardMedia customer={value?.customer} typographyVariant={TYPOGRAPHY.H2} />
        <TextIconListItem truncatedName={value?.name} tradingAliases={value?.tradingName} />
       </GStyledSpanBox>
      </Grid>
      <Grid item xs={4} sm={4} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
       {renderStatusIcons()}
      </Grid>
      <Grid container p={2} display={FLEX.FLEX} justifyContent={FLEX_DIR.ROW}>
       {!isDesktop && (
        <Grid item xs={5} sm={12}>
         {renderStatusIcons()}
        </Grid>
       )}
      </Grid>
     </Grid>
    </Grid>
   </GStyledHeaderCardContainer>
  </Fragment>
 )
}

HomeNav.propTypes = {
 current: PropTypes.number,
 value: PropTypes.any,
 isLoading: PropTypes.bool
}

export default HomeNav
