import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { useMediaQuery, Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledContactCard, GStyledListItemText, GStyledSpanBox, GStyledTooltip } from 'theme/style'
import { truncate } from 'util/truncate'
import { IconTooltip } from 'component'
import { LABEL, TYPOGRAPHY, KEY, FLEX } from 'constant'
import { Iconify } from 'component/iconify'

const ContactCard = ({ selectedCardId, value, handleContactCard, c }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const fullName = contact => contact?.firstName + ' ' + contact?.lastName
  const notEmployed = c => c?.formerEmployee === true
  const primaryPhone = Array.isArray(c?.phoneNumbers) && c.phoneNumbers.length
  ? c.phoneNumbers[0]?.contactNumber
  : c?.phone; 
  const getContactTitleOrEmail = c => {
  const hasValidTitle = c?.title
  const hasValidEmail = c?.email && c?.email.length <= 18
  const shouldShowSeparator = hasValidTitle && hasValidEmail

  return `${hasValidTitle ? c.title : ''}${shouldShowSeparator ? ' / ' : ''}${hasValidTitle && hasValidTitle.length <= 20 && hasValidEmail ? c.email : ''}`
 }
 return (
   <GStyledContactCard onClick={event => handleContactCard(event, c._id)} selectedCardId={selectedCardId} c={c} mode={themeMode}>
     <Grid item xs={10}>
       <Box height={50}>
         <GStyledListItemText
           primary={
             c && (
               <GStyledSpanBox>
                 <Typography
                   color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'}
                   variant={TYPOGRAPHY.H5}
                   sx={{
                     opacity: selectedCardId === c._id ? 0.7 : 1
                   }}>
                   {truncate(fullName(c), 30)}
                 </Typography>
               </GStyledSpanBox>
             )
           }
           secondary={
             <Typography variant={isDesktop ? TYPOGRAPHY.BODY0 : TYPOGRAPHY.CAPTION} color='text.secondary'>
               {getContactTitleOrEmail(c)}
             </Typography>
           }
         />
       </Box>
     </Grid>
     <Grid item xs='auto' flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
       <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
         <IconTooltip
           title={LABEL.CONTACT_THIS(c.firstName, primaryPhone)}
           icon={ICON_NAME.PHONE}
           color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
           tooltipColor={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
           disabled={!primaryPhone}
           cursor={!primaryPhone}
           dimension={18}
           iconOnly
         />
         {/* <IconTooltip
           title={notEmployed ? LABEL.NOT_EMPLOYED : LABEL.CURRENTLY_EMPLOYED}
           icon={notEmployed ? ICON_NAME.NOT_EMPLOYED : ICON_NAME.CURRENTLY_EMPLOYED}
           color={notEmployed ? theme.palette.error.dark : !notEmployed && themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
           tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
           dimension={18}
           disabled={!c.phone}
           isActiveIcon
           iconOnly
           /> */}
          <GStyledTooltip 
            title={notEmployed(c) ? LABEL.NOT_EMPLOYED : LABEL.CURRENTLY_EMPLOYED} 
            tooltipcolor={notEmployed(c) ? '#878787' : '#008000'} 
            placement='top' 
            disableFocusListener>
            <Iconify 
              icon='ri:user-location-fill' 
              color={notEmployed(c) ? '#878787' : '#008000'}  
              sx={{ minWidth: 18, minHeight: 18 }}
            />
          </GStyledTooltip>
       </GStyledSpanBox>
     </Grid>
   </GStyledContactCard>
 )
}

ContactCard.propTypes = {
 selectedCardId: PropTypes.any,
 value: PropTypes.any,
 handleContactCard: PropTypes.func,
 contact: PropTypes.any,
 c: PropTypes.any
}

export default ContactCard
