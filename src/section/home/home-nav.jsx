import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext, ICON_NAME, useResponsive } from 'hook'
import { Tag, Flex } from 'antd'
import { useMediaQuery, Grid, Typography, ListItemText } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox, GStyledListItemText, GStyledMiniChip } from 'theme/style'
import { SvgFlagIcon, IconTooltip, ViewFormField, BadgeCardMedia, GridViewField } from 'component'
import { KEY, TYPOGRAPHY, LABEL, FLEX, FLEX_DIR, SIZE } from 'constant'
import { truncate } from 'util'

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
        <BadgeCardMedia />
        <ListItemText
         primary={
          <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'} variant={isMobile ? TYPOGRAPHY.H5 : TYPOGRAPHY.H4}>
           {truncate(value?.name, 50)}
          </Typography>
         }
         secondary={
          <Grid
           container
           sx={{
            height: 20,
            flexWrap: 'wrap',
            overflow: 'auto'
           }}>
           {value?.tradingName &&
            value?.tradingName?.slice(0, 3)?.map((item, index) => (
             <Typography key={index} color={theme.palette.grey[500]} variant={isDesktop ? TYPOGRAPHY.OVERLINE1 : TYPOGRAPHY.OVERLINE_MINI} mx={0.5}>
              {item}
             </Typography>
            ))}
          </Grid>
         }
        />
       </GStyledSpanBox>
      </Grid>
      <Grid item xs={4} sm={4} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
       {renderStatusIcons()}
      </Grid>
      <Grid container p={2} display={FLEX.FLEX} justifyContent={FLEX_DIR.ROW}>
       {/* <GridViewField heading={t('trading_name.label')} isLoading={isLoading} chip={value?.tradingName} gridSize={7} isNoBg /> */}
       {!isDesktop && (
        <Grid item xs={5} sm={12}>
         {renderStatusIcons()}
        </Grid>
       )}
       {/* {isDesktop && <GridViewField heading={t('website.label')} isLoading={isLoading} link={value?.website} gridSize={4} isNoBg />} */}
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
