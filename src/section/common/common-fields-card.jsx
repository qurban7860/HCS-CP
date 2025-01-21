import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { useTheme, Box, Card, Grid, Link } from '@mui/material'
import { GridViewField, GridViewTitle, IconTooltip } from 'component'
import { GCardOption, GStyledTopBorderDivider, GStyledSpanBox, GStyledIconLoadingButton } from 'theme/style'
import { KEY, FLEX } from 'constant'
import { truncate } from 'util'

const CommonFieldsCard = ({ defaultValues, fieldsConfig, i18nKey, isLoading, handleDialog, isChildren, children, withStatusIcon, isContactsPage, contactHasActiveUser, handleUserInvite }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const renderFields = config => {
  return (
   <Fragment>
    {config?.map(field => {
     let content = null
     let additionalProps = null

     switch (field.type) {
      case 'title':
       return (
        <Grid item xs={12} sm={12} key={field.key}>
         <GridViewTitle title={t(field.title)} />
        </Grid>
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
  <Box mb={2}>
   <Card {...GCardOption(themeMode)}>
    <GStyledTopBorderDivider mode={themeMode} />
    <Grid container spacing={1} px={1.5}>
     {withStatusIcon && (
      <Grid item xs={12} sm={12} mt={1.5}>
       <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={2}>
       {isContactsPage && (
          contactHasActiveUser ? (
            <IconTooltip
              title={t('has_active_user_account.label')}
              icon={ICON_NAME.USER_ACTIVE}
              color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.blue}
              tooltipColor={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.blue}
              tooltipTextColor={theme.palette.common.white}
              iconOnly
            />
          ) : (
            <GStyledIconLoadingButton textColor={theme.palette.common.white} bgColor={theme.palette.howick.midBlue} onClick={handleUserInvite} gap={2}>
              <Icon icon={ICON_NAME.MAIL_USER} sx={{ width: 15, height: 15, p: 0 }}/> &nbsp; {t('send_invite.label').toUpperCase()}
            </GStyledIconLoadingButton>
          )
        )}
        {defaultValues?.isActive ? (
         <IconTooltip
          title={t('active.label')}
          icon={ICON_NAME.ACTIVE}
          color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
          tooltipTextColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
          iconOnly
         />
        ) : (
         <IconTooltip title={t('inactive.label')} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
        )}
       </GStyledSpanBox>
      </Grid>
     )}

     <GridViewTitle title={t(i18nKey)} />
     <Grid item lg={12} sm={12}>
      <Grid container spacing={2} p={1} pb={5}>
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
 isChildren: PropTypes.bool,
 withStatusIcon: PropTypes.bool,
 isContactsPage: PropTypes.bool,
 contactHasActiveUser: PropTypes.bool,
 handleUserInvite: PropTypes.func
}

export default CommonFieldsCard
