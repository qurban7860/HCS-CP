import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext, ICON_NAME } from 'hook'
import { useTheme, useMediaQuery, Typography, Box, Divider, Grid, Link } from '@mui/material'
import { GridViewField, GridViewTitle, IconTooltip } from 'component'
import { GStyledSpanBox } from 'theme/style'
import { KEY, FLEX, VARIANT, TYPOGRAPHY } from 'constant'
import { truncate } from 'util'
import { parseArrDesc } from 'util/parse-arr-desc'

const CommonFieldsContainer = ({ defaultValues, fieldsConfig, i18nKey, isLoading, handleDialog, isChildren, children, withStatusIcon }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 let content = null
 let additionalProps = null

 const renderFields = config => {
  return (
   <Fragment>
    {config?.map(field => {
     switch (field.type) {
      case 'title':
       return (
        <Grid item xs={12} sm={12} key={field.key}>
         <GridViewTitle title={t(field.title)} />
        </Grid>
       )
      case 'titleWithDividers':
       return (
        <Grid item xs={12} sm={12} key={field.key}>
         <GridViewTitle title={t(field.title)} />
         <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: 5 }} />
        </Grid>
       )
      case 'supportDescription':
       return (
        <Box key={field.key} m={2} width={'100%'}>
         <Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.OVERLINE} color={theme.palette.grey[600]}>
          {t('description.label')}
         </Typography>
         <Grid container my={2}>
          <Grid item xs={12} md={12}>
           <Typography variant={isDesktop ? TYPOGRAPHY.BODY1 : TYPOGRAPHY.BODY2}>{parseArrDesc(field.value(defaultValues))}</Typography>
          </Grid>
         </Grid>
        </Box>
       )
      case 'link':
       additionalProps = field.additionalProps ? field.additionalProps(defaultValues, handleDialog, themeMode) : {}
       content = field.value && field.value(defaultValues)
       return (
        <GridViewField key={field.key} heading={t(field.heading)} isLoading={isLoading} gridSize={field.gridSize || 6} {...additionalProps}>
         <Link
          onClick={event => field.linkProps.onClick(event, defaultValues?.customerId, handleDialog)}
          href={field.linkProps.href}
          underline={field.linkProps.underline}
          color={field.linkProps.color(themeMode)}>
          {truncate(content, field.truncate)}
         </Link>
        </GridViewField>
       )
      default:
       additionalProps = field.additionalProps ? field.additionalProps(defaultValues, handleDialog, themeMode) : {}
       content = field.value && field.value(defaultValues)
       return (
        <GridViewField key={field.key} heading={t(field.heading)} isLoading={isLoading} gridSize={field.gridSize || 6} {...additionalProps}>
         {content}
        </GridViewField>
       )
     }
    })}
   </Fragment>
  )
 }
 return (
  <Box>
   <Grid container p={1.5}>
    {withStatusIcon && (
     <Grid item xs={12} sm={12}>
      <GStyledSpanBox justifyContent={FLEX.FLEX_END}>
       {defaultValues?.isActive ? (
        <IconTooltip
         title={t('active.label')}
         icon={ICON_NAME.ACTIVE}
         color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
         tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
         isActiveIcon
         iconOnly
        />
       ) : (
        <IconTooltip title={t('nactive.label')} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
       )}
      </GStyledSpanBox>
     </Grid>
    )}
    {i18nKey && <GridViewTitle title={t(i18nKey)} />}
    <Grid item lg={12} sm={12}>
     <Grid container spacing={2} p={2} pb={5}>
      {isChildren ? children : renderFields(fieldsConfig)}
     </Grid>
    </Grid>
   </Grid>
  </Box>
 )
}

CommonFieldsContainer.propTypes = {
 defaultValues: PropTypes.object,
 fieldsConfig: PropTypes.array,
 children: PropTypes.node,
 i18nKey: PropTypes.string,
 handleDialog: PropTypes.func,
 isLoading: PropTypes.bool,
 isChildren: PropTypes.bool,
 withStatusIcon: PropTypes.bool
}

export default CommonFieldsContainer
