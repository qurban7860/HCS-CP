import { alpha } from '@mui/material/styles'

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& span.MuiAutocomplete-tag': {
            ...theme.typography.body2,
            width: 24,
            height: 24,
            lineHeight: '24px',
            textAlign: 'center',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.grey[500], 0.16),
          },
        },
        paper: {
          boxShadow: theme.customShadow.dropdown,
        },
        listbox: {
          padding: theme.spacing(0, 1),
        },
        option: {
          ...theme.typography.body2,
          padding: theme.spacing(1),
          margin: theme.spacing(0.75, 0),
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
  }
}
