import PropTypes from 'prop-types'
import { useMemo } from 'react'
import merge from 'lodash/merge'
// @mui
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useSettingContext } from './setting-context'

ThemeContrast.propTypes = {
  children: PropTypes.node,
}

function ThemeContrast({ children }) {
  const outerTheme = useTheme()

  const { themeContrast, themeMode } = useSettingContext()
  const isLight = themeMode === 'light'
  const isContrastBold = themeContrast === 'bold'

  const themeOptions = useMemo(
    () => ({
      palette: {
        background: {
          ...(isContrastBold && {
            default: isLight ? outerTheme.palette.grey[100] : outerTheme.palette.grey[900],
          }),
        },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            ...(isContrastBold && {
              root: {
                boxShadow: outerTheme.customShadow.z4,
              },
            }),
          },
        },
      },
    }),
    [isLight, themeContrast]
  )

  const theme = createTheme(merge(outerTheme, themeOptions))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default ThemeContrast
