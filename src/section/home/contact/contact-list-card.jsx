import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { ICON_NAME, useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { setContactDialog } from 'store/slice'
import { Grid, Typography, IconButton, Divider, Box, Card } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GridViewTitle, IconTooltip } from 'component'
import { GStyledListItemText, GStyledSpanBox, GCardNoHeightOption, GStyledTopBorderDivider } from 'theme/style'
import { RADIUS } from 'config/layout'
import { VARIANT, SIZE, LABEL, KEY, FLEX } from 'constant'

const { TYPOGRAPHY } = VARIANT

const ContactListCard = ({ value, handleContactDialog }) => {
 const { contacts } = useSelector(state => state.contact)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 useEffect(() => {
  dispatch(setContactDialog(false))
 }, [dispatch])

 const fullName = contact => contact?.firstName + ' ' + contact?.lastName
 const notEmployed = c => c?.formerEmployee === true
 const getContactTitleOrEmail = c => {
  const hasValidTitle = c?.title
  const hasValidEmail = c?.email && c?.email.length <= 18
  const shouldShowSeparator = hasValidTitle && hasValidEmail
  return `${hasValidTitle ? c.title : ''}${shouldShowSeparator ? ' / ' : ''}${hasValidTitle && hasValidTitle.length <= 20 && hasValidEmail ? c.email : ''}`
 }

 return (
  <Box>
   <Card {...GCardNoHeightOption(themeMode)}>
    <Grid item lg={12} sm={12} bgcolor='background.paper'>
     <GStyledTopBorderDivider mode={themeMode} />
     <Grid container spacing={2} px={1.5}>
      <GridViewTitle title={contacts?.length > 1 ? t('contact.contacts.label') : t('contact.label')} />
      <Grid
       container
       sx={{
        height: contacts?.length < 5 ? 'auto' : '400px',
        overflow: KEY.AUTO,
        scrollBehavior: 'smooth'
       }}>
       <Grid container p={2}>
        {contacts?.length > 0 ? (
         contacts.map((c, index) => (
          <Fragment key={index}>
           <Grid item xs={10}>
            <Box height={50}>
             <GStyledListItemText
              primary={
               c && (
                <GStyledSpanBox>
                 <IconButton
                  size={SIZE.MEDIUM}
                  color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                  aria-label='view'
                  target={KEY.BLANK}
                  sx={{
                   padding: 0,
                   borderRadius: RADIUS.BORDER.borderRadius,
                   m: 0
                  }}
                  onClick={() => handleContactDialog(c._id)}>
                  <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H5}>
                   {fullName(c)}
                  </Typography>
                 </IconButton>
                </GStyledSpanBox>
               )
              }
              secondary={
               <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
                {getContactTitleOrEmail(c)}
               </Typography>
              }
             />
            </Box>
           </Grid>
           <Grid item xs={2} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
            <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
             <IconTooltip
              title={notEmployed(c) ? LABEL.NOT_EMPLOYED : LABEL.CURRENTLY_EMPLOYED}
              icon={notEmployed(c) ? ICON_NAME.NOT_EMPLOYED : ICON_NAME.CURRENTLY_EMPLOYED}
              color={notEmployed(c) ? theme.palette.error.dark : !notEmployed(c) && themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
              tooltipColor={notEmployed(c) ? theme.palette.error.dark : !notEmployed(c) && themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
              dimension={18}
              disabled={notEmployed(c)}
              isActiveIcon
              iconOnly
             />
            </GStyledSpanBox>
           </Grid>
           {index !== contacts.length - 1 && <Divider variant={VARIANT.FULL_WIDTH} style={{ width: '100%', marginBottom: '10px' }} />}
          </Fragment>
         ))
        ) : (
         <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
          <Trans i18nKey='no_found.label' values={{ value: 'contact' }} />
         </Typography>
        )}
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   </Card>
  </Box>
 )
}

ContactListCard.propTypes = {
 value: PropTypes.object,
 handleContactDialog: PropTypes.func
}

export default ContactListCard
