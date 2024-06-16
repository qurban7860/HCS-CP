import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Stack } from '@mui/material'
import { GStyledWelcomeTitle, GStyledWelcomeContainerDiv, GStyledWelcomeDescription, GStyledSpanBox } from 'theme/style'
import { useTheme } from '@mui/material/styles'
import { KEY, TYPOGRAPHY } from 'constant'
import { ASSET } from 'config'

Welcome.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string
}

function Welcome({ title, description, action, img, ...other }) {
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
          <img alt="logo" src={themeMode === KEY.DARK ? ASSET.HOWICK_PORTAL_DARK : ASSET.HOWICK_PORTAL} width={900} />
        </GStyledSpanBox>
        <GStyledWelcomeDescription variant={TYPOGRAPHY.SUBTITLE0} themeMode={themeMode}>
          {description}
        </GStyledWelcomeDescription>
        {action && action}
      </Stack>
      {img && img}
    </GStyledWelcomeContainerDiv>
  )
}

export default Welcome
