import { memo } from 'react'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'
import { useSettingContext, ICON_NAME } from 'hook'
import { Box, Grid, Typography, Link } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledCard } from 'theme/style'
import { IconTooltip } from 'component'
import { LABEL, TYPOGRAPHY, KEY, FLEX } from 'constant'

const UsersCard = ({ selectedCardId, handleSelected, handleUserCard, handleUserInNewTabCard, user }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 return (
  <GStyledCard onClick={event => handleSelected(event, user?._id)} selectedCardId={selectedCardId} value={user} mode={themeMode}>
   <Grid item xs={10}>
    <Box height={50}>
     <GStyledListItemText
      primary={
       user && (
        <GStyledSpanBox>
         <Link
          onClick={event => handleUserCard(event, user._id)}
          sx={{
           color: themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange,
           cursor: 'pointer'
          }}>
          <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H4} sx={{ opacity: selectedCardId === user._id ? 0.7 : 1 }}>
           {user?.name}
          </Typography>
         </Link>
         &nbsp;
         <IconTooltip
          onClick={event => handleUserInNewTabCard(event, user._id)}
          title={<Trans i18nKey='open_in_new_tab.label' values={{ value: 'Machine' }} />}
          icon={ICON_NAME.OPEN_IN_NEW}
          placement={KEY.RIGHT}
          color={theme.palette.grey[500]}
          dimension={15}
          px={0}
          iconOnly
         />
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        {user?.name}
       </Typography>
      }
     />
    </Box>
   </Grid>
   <Grid item xs={2} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
    <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
     {user?.isActive ? (
      <IconTooltip
       title={LABEL.ACTIVE}
       icon={ICON_NAME.ACTIVE}
       color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
       tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
       buttonColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
       tooltipTextColor={themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.common.black}
       iconOnly
      />
     ) : (
      <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} iconOnly />
     )}
    </GStyledSpanBox>
   </Grid>
  </GStyledCard>
 )
}

UsersCard.propTypes = {
 selectedCardId: PropTypes.string,
 value: PropTypes.any,
 contact: PropTypes.any,
 user: PropTypes.any,
 handleSelected: PropTypes.func,
 handleUserCard: PropTypes.func,
 handleUserInNewTabCard: PropTypes.func
}

export default memo(UsersCard)
