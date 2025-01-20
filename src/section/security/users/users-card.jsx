import { memo } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME, useUIMorph } from 'hook'
import { Box, Grid, Typography, Link } from '@mui/material'
import { IconTooltip, ChipsGrid, CustomAvatar, BadgeStatus } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledListItemText, GStyledSpanBox, GStyledCard } from 'theme/style'
import { LABEL, TYPOGRAPHY, KEY, FLEX } from 'constant'

const UsersCard = ({ selectedCardId, handleSelected, handleUserCard, user }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const { isDesktop } = useUIMorph()

 return (
  <GStyledCard onClick={event => handleSelected(event, user?._id)} selectedCardId={selectedCardId} value={user} mode={themeMode}>
   <Grid item xs={10}>
    <Box height={50}>
     <GStyledListItemText
      primary={
       user && (
        <GStyledSpanBox>
         <Box mr={1}>
          <CustomAvatar
           inTableList
           BadgeProps={{
            badgeContent: <BadgeStatus status={user?.isOnline ? 'online' : 'offline'} />
           }}
           typography={!isDesktop ? TYPOGRAPHY.OVERLINE_MINI : TYPOGRAPHY.H6}
           alt={'display name'}
           name={user?.name}
          />
         </Box>
         <Link
          variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.H6}
          onClick={event => handleUserCard(event, user._id)}
          sx={{ color: themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.howick.orange, cursor: 'pointer' }}>
          {user?.name}
         </Link>
         &nbsp;
        </GStyledSpanBox>
       )
      }
      secondary={
       <Typography variant={TYPOGRAPHY.BODY2} color='text.secondary'>
        {user?.email}
       </Typography>
      }
     />
    </Box>
   </Grid>
   <Grid item xs={2} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
    <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
     <ChipsGrid isRole chips={user?.roles} chipKey={'name'} />
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
