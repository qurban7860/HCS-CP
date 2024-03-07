import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'component/setting'
import { CssBaseline } from '@mui/material'
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import palette from './palette'
import shadows from './shadows'
import customShadow from './custom-shadow'
import typography from './typography'

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
      shadows: shadows(themeMode),
      customShadow: customShadow(themeMode),
    }),
    [themeDirection, themeMode]
  )

  const theme = createTheme(themeOptions)

  theme.components = componentsOverride(theme)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider
