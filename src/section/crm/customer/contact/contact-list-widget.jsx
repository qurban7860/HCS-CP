import { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { ICON_NAME, useSettingContext } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { setContactDialog } from 'store/slice'
import { Grid, Typography, IconButton, Divider, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FormHeader, IconTooltip } from 'component'
import { GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { RADIUS } from 'config/layout'
import { VARIANT, SIZE, LABEL, KEY, FLEX } from 'constant'

const { TYPOGRAPHY } = VARIANT

const ContactListWidget = ({ value, handleContactDialog }) => {
 const { contacts } = useSelector(state => state.contact)
 const theme = useTheme()
 const { themeMode } = useSettingContext()

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
  <Grid container mb={2}>
   <Grid item lg={12} sm={12} mb={2} bgcolor='background.paper'>
    <GStyledSpanBox>
     <FormHeader label={LABEL.CONTACT(contacts?.length)} />
    </GStyledSpanBox>

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
                ...RADIUS.BORDER,
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
           title={LABEL.CONTACT_THIS(c.firstName, c.phone)}
           icon={ICON_NAME.PHONE}
           color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
           dimension={18}
           disabled={!c.phone}
           iconOnly
           cursor
          />
          <IconTooltip
           title={notEmployed(c) ? LABEL.NOT_EMPLOYED : LABEL.CURRENTLY_EMPLOYED}
           icon={notEmployed(c) ? ICON_NAME.NOT_EMPLOYED : ICON_NAME.CURRENTLY_EMPLOYED}
           color={notEmployed(c) ? theme.palette.error.dark : !notEmployed(c) && themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
           dimension={18}
           disabled={!c.phone}
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
       {LABEL.NO_CONTACT_FOUND}
      </Typography>
     )}
    </Grid>
   </Grid>
  </Grid>
 )
}

ContactListWidget.propTypes = {
 value: PropTypes.object,
 handleContactDialog: PropTypes.func
}

export default ContactListWidget
