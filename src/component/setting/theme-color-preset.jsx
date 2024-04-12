import { useMemo } from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles'

ThemeColorPreset.propTypes = {
  children: PropTypes.node,
}

export default function ThemeColorPreset({ children }) {
  const outerTheme = useTheme()

  const { palette } = useTheme()
  const themeOptions = useMemo(
    () => ({
      customShadow: {
        primary: `0 8px 16px 0 ${alpha(palette.success.main, 0.24)}`,
      },
    }),
    [presetColor]
  )

  const theme = createTheme(merge(outerTheme, themeOptions))

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
