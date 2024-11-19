import PropTypes from 'prop-types'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { Stack, Box, Grid, Card, Typography } from '@mui/material'
import { GStyledWelcomeTitle, GStyledWelcomeContainerDiv, GStyledWelcomeDescription, GStyledSpanBox, GStyledTopBorderDivider, GCardOption } from 'theme/style'
import { useTheme } from '@mui/material/styles'
import { KEY, TYPOGRAPHY } from 'constant'
import { ASSET } from 'config'

function Welcome({ title, description, action, img, customer, ...other }) {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 return (
  <GStyledWelcomeContainerDiv {...other}>
   <Stack
    flexGrow={1}
    sx={{
     textAlign: { xs: KEY.CENTER, md: KEY.LEFT },
     mb: { xs: 5, md: 10 },
     mt: { xs: 0, md: 5 }
    }}>
    {/* keep for branding  */}
    <GStyledSpanBox gap={2} my={2}>
     <img alt='logo' src={themeMode === KEY.DARK ? ASSET.HOWICK_PORTAL_DARK : ASSET.HOWICK_PORTAL} width={900} style={{ pointerEvents: KEY.NONE }} />
    </GStyledSpanBox>
    <GStyledWelcomeDescription variant={TYPOGRAPHY.SUBTITLE0} themeMode={themeMode}>
     {description}
    </GStyledWelcomeDescription>
    {action && action}
    <Grid container my={2}>
     <Grid item xs={12} sm={4}>
      <Box m={2}>
       <Card {...GCardOption(themeMode)}>
        <GStyledTopBorderDivider mode={themeMode} />
        <GStyledSpanBox px={2}>
         <Icon icon={ICON_NAME.COMPANY} />
         <Typography variant={TYPOGRAPHY.H3} m={2}>
          {customer?.name}
         </Typography>
        </GStyledSpanBox>
       </Card>
      </Box>
     </Grid>
    </Grid>
   </Stack>
   {img && img}
  </GStyledWelcomeContainerDiv>
 )
}

Welcome.propTypes = {
 img: PropTypes.node,
 action: PropTypes.node,
 title: PropTypes.string,
 description: PropTypes.string,
 customer: PropTypes.object
}

export default Welcome
