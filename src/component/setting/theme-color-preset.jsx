import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { useMemo } from 'react'
// @mui
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
//
import { useSettingContext } from './setting-context'

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
}

export default function ThemeColorPresets({ children }) {
  const outerTheme = useTheme()

  const { presetsColor } = useSettingContext()

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: presetsColor,
      },
      customShadow: {
        primary: `0 8px 16px 0 ${alpha(presetsColor.main, 0.24)}`,
      },
    }),
    [presetsColor]
  )

  const theme = createTheme(merge(outerTheme, themeOptions))

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
