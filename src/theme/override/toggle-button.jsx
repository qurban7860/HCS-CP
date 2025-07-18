import { alpha } from '@mui/material/styles'

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error']

export default function ToggleButton(theme) {
  const rootStyle = (ownerState) => {
    const standardColor = ownerState.color === 'standard'

    const defaultStyle = {
      ...(standardColor && {
        '&.Mui-selected': {
          borderColor: 'inherit',
        },
      }),
    }

    const colorStyle = COLORS.map((color) => ({
      ...(ownerState.color === color && {
        '&:hover': {
          borderColor: alpha(theme.palette[color].main, 0.48),
          backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
        },
        '&.Mui-selected': {
          borderColor: theme.palette[color].main,
        },
      }),
    }))

    const disabledState = {
      '&.Mui-disabled': {
        '&.Mui-selected': {
          color: theme.palette.action.disabled,
          backgroundColor: theme.palette.action.selected,
          borderColor: theme.palette.action.disabledBackground,
        },
      },
    }

    return [...colorStyle, defaultStyle, disabledState]
  }

  return {
    MuiToggleButton: {
      styleOverrides: {
        root: ({ ownerState }) => rootStyle(ownerState),
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          border: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
        },
        grouped: {
          margin: 4,
          borderColor: 'transparent !important',
          borderRadius: `${theme.shape.borderRadius}px !important`,
        },
      },
    },
  }
}
