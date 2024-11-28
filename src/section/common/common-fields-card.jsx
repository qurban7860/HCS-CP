import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext, ICON_NAME } from 'hook'
import { useTheme, Box, Card, Grid, Link } from '@mui/material'
import { GridViewField, GridViewTitle, IconTooltip } from 'component'
import { GCardOption, GStyledTopBorderDivider, GStyledSpanBox } from 'theme/style'
import { KEY, FLEX } from 'constant'
import { truncate } from 'util'

const CommonFieldsCard = ({ defaultValues, fieldsConfig, i18nKey, isLoading, handleDialog, isChildren, children }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

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
      case 'link':
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
       var additionalProps = field.additionalProps ? field.additionalProps(defaultValues, handleDialog, themeMode) : {}
       var content = field.value && field.value(defaultValues)
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
  <Box mb={2}>
   <Card {...GCardOption(themeMode)}>
    <GStyledTopBorderDivider mode={themeMode} />
    <Grid container p={1.5}>
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
     <GridViewTitle title={t(i18nKey)} />
     <Grid item lg={12} sm={12}>
      <Grid container spacing={2} p={2} pb={5}>
       {isChildren ? children : renderFields(fieldsConfig)}
      </Grid>
     </Grid>
    </Grid>
   </Card>
  </Box>
 )
}

CommonFieldsCard.propTypes = {
 defaultValues: PropTypes.object,
 fieldsConfig: PropTypes.array,
 children: PropTypes.node,
 i18nKey: PropTypes.string,
 handleDialog: PropTypes.func,
 isLoading: PropTypes.bool,
 isChildren: PropTypes.bool
}

export default CommonFieldsCard
