import { alpha, useTheme } from '@mui/material/styles'
import { GlobalStyles } from '@mui/material'
import { bgBlur } from 'theme/style'

function StyledChart() {
  const theme = useTheme()

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '.apexcharts-canvas': {
          // Tooltip
          '.apexcharts-xaxistooltip': {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            color: 'black',
            boxShadow: theme.customShadow.dropdown,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '&:before': { borderBottomColor: 'transparent' },
            '&:after': { borderBottomColor: alpha(theme.palette.background.default, 0.8) },
          },
          '.apexcharts-tooltip.apexcharts-theme-light': {
            ...bgBlur({ color: theme.palette.background.default }),
            border: 0,
            boxShadow: theme.customShadow.dropdown,
            borderRadius: Number(theme.shape.borderRadius) * 1.5,
            '.apexcharts-tooltip-title': {
              border: 0,
              textAlign: 'center',
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: alpha(theme.palette.grey[500], 0.16),
              color: theme.palette.text[theme.palette.mode === 'light' ? 'primary' : 'secondary'],
            },
          },

          // Legend
          '.apexcharts-legend': {
            padding: 0,
          },
          '.apexcharts-legend-series': {
            display: 'flex !important',
            alignItems: 'center',
          },
          '.apexcharts-legend-marker': {
            marginRight: 8,
          },
          '.apexcharts-legend-text': {
            lineHeight: '18px',
            textTransform: 'capitalize',
          },
        },
      }}
    />
  )

  return inputGlobalStyles
}

export default StyledChart
