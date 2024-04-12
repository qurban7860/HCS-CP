import { RADIUS } from 'config'

export default function Dialog(theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.default,
          boxShadow: theme.customShadow.dialog,
          '&.MuiPaper-rounded': {
            borderRadius: theme.shape.borderRadius,
          },
          '&.MuiDialog-paperFullScreen': {
            borderRadius: 0,
          },
          '&.MuiDialog-paper .MuiDialogActions-root': {
            padding: theme.spacing(2),
          },
          '@media (max-width: 600px)': {
            margin: theme.spacing(2),
          },
          '@media (max-width: 663.95px)': {
            '&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
              maxWidth: '100%',
            },
          },
        },
        paperFullWidth: {
          width: '100%',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 3),
        },
        dividers: {
          borderTop: 0,
          borderBottomStyle: 'solid',
          paddingBottom: theme.spacing(3),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '& > :not(:first-of-type)': {
            marginLeft: theme.spacing(1.5),
          },
        },
      },
    },
  }
}
