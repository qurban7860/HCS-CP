import PropTypes from 'prop-types'

ThemeProvider.propTypes = {
  children: PropTypes.node,
}

function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettingsContext()

  const themeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
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
