import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Typography, Stack } from '@mui/material'
import {
  StyledWelcomeTitle,
  StyledWelcomeContainerDiv,
  StyledWelcomeDescription,
} from 'theme/style'
import { useSettingContext } from 'component/setting'
import { useTheme } from '@mui/material/styles'
import { KEY } from 'constant'

Welcome.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
}

function Welcome({ title, description, action, img, ...other }) {
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  return (
    <StyledWelcomeContainerDiv {...other}>
      <Stack
        flexGrow={1}
        sx={{
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 5, md: 10 },
          mt: { xs: 0, md: 5 },
        }}
      >
        <StyledWelcomeTitle variant="h0" fontWeight="bold" themeMode={themeMode}>
          {title}
        </StyledWelcomeTitle>
        <StyledWelcomeDescription variant="subtitle0" themeMode={themeMode}>
          {description}
        </StyledWelcomeDescription>
        {action && action}
      </Stack>
      {img && img}
    </StyledWelcomeContainerDiv>
  )
}

export default Welcome
