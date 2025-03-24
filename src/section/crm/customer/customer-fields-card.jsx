import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { Box, Card, Grid, Link } from '@mui/material'
import { GridViewField, GridViewTitle } from 'component'
import { GCardOption, GStyledTopBorderDivider } from 'theme/style'
import { truncate } from 'util'

const CustomerFieldsCard = ({ defaultValues, fieldsConfig, i18nKey, isLoading, handleDialog, isChildren, children }) => {
 const { themeMode } = useSettingContext()

 const renderFields = config => {
  return (
   <Fragment>
    {config?.map(field => {
     const additionalProps = field.additionalProps ? field.additionalProps(defaultValues, handleDialog, themeMode) : {}
     let content = field.value && field.value(defaultValues)
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
 return (
  <Box mb={2}>
   <Card {...GCardOption(themeMode)}>
    <GStyledTopBorderDivider mode={themeMode} />
    <Grid container spacing={2} px={1.5}>
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

CustomerFieldsCard.propTypes = {
 defaultValues: PropTypes.object,
 fieldsConfig: PropTypes.array,
 children: PropTypes.node,
 i18nKey: PropTypes.string,
 handleDialog: PropTypes.func,
 isLoading: PropTypes.bool,
 isChildren: PropTypes.bool
}

export default CustomerFieldsCard
