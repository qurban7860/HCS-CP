import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'component/setting'
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import GlobalStyle from './global-style'
import palette from './palette'
import shadow from './shadow'
import customShadow from './custom-shadow'
import typography from './typography'
import ComponentOverride from './override'

ThemeProvider.propTypes = {
  children: PropTypes.node,
}

function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettingContext()

  const themeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadow: shadow(themeMode),
      customShadow: customShadow(themeMode),
    }),
    [themeDirection, themeMode]
  )

  const theme = createTheme(themeOptions)
  theme.components = ComponentOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider
