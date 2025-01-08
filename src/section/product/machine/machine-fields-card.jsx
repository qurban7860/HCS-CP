import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { Box, Card, Grid, Link, Typography } from '@mui/material'
import { GridViewField, GridViewTitle } from 'component'
import { useTheme } from '@mui/material/styles'
import { GCardOption, GStyledSpanBox, GStyledChip, GStyledTopBorderDivider } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'
import { truncate } from 'util'

const MachineFieldsCard = ({ defaultValues, fieldsConfig, i18nKey, isLoading, handleDialog, isChildren, children, mountSupportExpiryChip }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const renderFields = config => {
  return (
   <Fragment>
    {config?.map(field => {
     const additionalProps = field.additionalProps ? field.additionalProps(defaultValues, handleDialog, themeMode) : {}
     let content = field.value(defaultValues)
     {
      if (field.type === 'link' && defaultValues[field.key]) {
       content = (
        <Link
         onClick={event => field.linkProps.onClick(event, defaultValues?.customerId, handleDialog)}
         href={field.linkProps.href}
         underline={field.linkProps.underline}
         color={field.linkProps.color(themeMode)}>
         {truncate(content, field.truncate)}
        </Link>
       )
      } else if (field.type === 'supportExpireChip') {
       return null
      }
     }
     return (
      <GridViewField key={field.key} heading={t(field.heading)} isLoading={isLoading} gridSize={field.gridSize || 6} {...additionalProps}>
       {content}
      </GridViewField>
     )
    })}
   </Fragment>
  )
 }
 const renderSupportExpiryChip = config => {
  return (
   mountSupportExpiryChip &&
   config.map(field => {
    let content = field.value(defaultValues) ? field.value(defaultValues) : t('not_provided.label')
    return field.type === 'supportExpireChip' && content ? (
     <Grid key={field.key} item lg={12} sm={12}>
      <Grid container display={'flex'} justifyContent={'flex-end'}>
       <GStyledSpanBox>
        <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
         {t('support_expiration.label') + ':'}&nbsp;
        </Typography>
        <GStyledChip
         size={'small'}
         variant={'outlined'}
         bgColor={themeMode === KEY.LIGHT ? theme.palette.error.main : theme.palette.error.dark}
         label={
          <Typography variant={TYPOGRAPHY.OVERLINE0} p={0}>
           {content}
          </Typography>
         }
         sx={{ color: theme.palette.common.white }}
        />
       </GStyledSpanBox>
      </Grid>
     </Grid>
    ) : null
   })
  )
 }
 return (
  <Box mb={2}>
   <Card {...GCardOption(themeMode)}>
    <GStyledTopBorderDivider mode={themeMode} />
    <Grid container spacing={2} px={1.5}>
     <GridViewTitle title={t(i18nKey)} />
     {mountSupportExpiryChip && renderSupportExpiryChip(fieldsConfig)}
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

MachineFieldsCard.propTypes = {
 defaultValues: PropTypes.object,
 fieldsConfig: PropTypes.array,
 children: PropTypes.node,
 i18nKey: PropTypes.string,
 handleDialog: PropTypes.func,
 isLoading: PropTypes.bool,
 isChildren: PropTypes.bool,
 mountSupportExpiryChip: PropTypes.bool
}

export default MachineFieldsCard
