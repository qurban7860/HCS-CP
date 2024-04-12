import PropTypes from 'prop-types'
import { Block, ModeOption, FullScreenOption, ContrastOption } from 'component/setting'
import { Box, Dialog, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { Scrollbar } from 'component/scrollbar'
import { useSettingContext } from 'component/setting'
import { useIcon, ICON_NAME } from 'hook'
import { NAV } from 'config'
import { TITLE } from 'constant'

const DisplayDialog = ({ open, handleClose, onResetSetting }) => {
  const { Icon: WebIcon, iconSrc: refreshSrc } = useIcon(ICON_NAME.REFRESH)
  const { iconSrc: closeSrc } = useIcon(ICON_NAME.CLOSE)

  const { themeMode } = useSettingContext()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      BackdropProps={{ invisible: true }}
      PaperProps={{
        sx: {
          width: NAV.W_BASE,
          ...(open && { '&:after': { position: 'relative', zIndex: 9999 } }),
          height: NAV.H_ACCOUNT_POPOVER,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 1, pr: 1, pl: NAV.SPACING }}
      >
        <Typography variant="body1" my={0} sx={{ flexGrow: 1 }}>
          {TITLE.DISPLAY_SETTING}
        </Typography>

        <Tooltip title="Reset">
          <Box sx={{ position: 'relative' }}>
            <IconButton onClick={onResetSetting}>
              <WebIcon icon={refreshSrc} />
            </IconButton>
          </Box>
        </Tooltip>

        <IconButton onClick={handleClose}>
          <WebIcon icon={closeSrc} />
        </IconButton>
      </Stack>

      <Divider />

      <Scrollbar sx={{ p: NAV.SPACING, pb: 0 }}>
        <Block {...TITLE.MODE(themeMode)}>
          <ModeOption />
        </Block>
        <Block {...TITLE.CONSTRAST}>
          <ContrastOption />
        </Block>
        <Block {...TITLE.FULLSCREEN}>
          <FullScreenOption />
        </Block>
      </Scrollbar>
    </Dialog>
  )
}

DisplayDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onResetSetting: PropTypes.func,
}

export { DisplayDialog }
