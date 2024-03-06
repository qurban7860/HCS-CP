import { useState } from 'react'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Divider, Drawer, Stack, Typography, Tooltip, IconButton } from '@mui/material'
import { bgBlur } from 'theme/style'
import { NAV } from 'config'
import { Iconify } from 'component/iconify'
import { Scrollbar } from 'component/scrollbar'
import { themePreset } from 'theme'
import { useSettingsContext } from 'component/setting'
import Block from './block'
import BadgeDot from './badge-dot'
import ModeOptions from './mode-option'
import LayoutOptions from './layout-option'
import StretchOptions from './stretch-option'
import ContrastOptions from './contrast-option'
import DirectionOptions from './direction-option'
import FullScreenOptions from './full-screen-option'
import ColorPresetsOptions from './color-preset-option'

const SPACING = 2.5

function SettingDrawer() {
  const {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
    onResetSetting,
  } = useSettingsContext()

  const theme = useTheme()

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const notDefault =
    themeMode !== themePreset.themeMode ||
    themeLayout !== themePreset.themeLayout ||
    themeStretch !== themePreset.themeStretch ||
    themeContrast !== themePreset.themeContrast ||
    themeDirection !== themePreset.themeDirection ||
    themeColorPresets !== themePreset.themeColorPresets

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }),
            width: NAV.W_BASE,
            boxShadow: `-24px 12px 40px 0 ${alpha(
              theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
              0.16
            )}`,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: SPACING }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>

          <Tooltip title="Reset">
            <Box sx={{ position: 'relative' }}>
              {notDefault && <BadgeDot />}
              <IconButton onClick={onResetSetting}>
                <Iconify icon="ic:round-refresh" />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: 'solid' }} />

        <Scrollbar sx={{ p: SPACING, pb: 0 }}>
          <Block title="Mode">
            <ModeOptions />
          </Block>

          <Block title="Contrast">
            <ContrastOptions />
          </Block>

          <Block title="Direction">
            <DirectionOptions />
          </Block>

          <Block title="Layout">
            <LayoutOptions />
          </Block>

          <Block title="Stretch" tooltip="Only available at large resolutions > 1600px (xl)">
            <StretchOptions />
          </Block>

          <Block title="Presets">
            <ColorPresetsOptions />
          </Block>
        </Scrollbar>

        <Box sx={{ p: SPACING, pt: 0 }}>
          <FullScreenOptions />
        </Box>
      </Drawer>
    </>
  )
}

export default SettingDrawer
