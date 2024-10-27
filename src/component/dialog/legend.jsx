import { memo } from 'react'
import { t } from 'i18next'
import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { Grid, Dialog, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'
import { IconTooltip } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox } from 'theme/style'
import { TYPOGRAPHY, FLEX, KEY, FLEX_DIR } from 'constant'

const LegendDialog = ({ open, onClose }) => {
 const theme = useTheme()
 const { themeMode } = useSettingContext()

 return (
  <Dialog disableEnforceFocus maxWidth={KEY.LG} open={open} onClose={onClose} aria-describedby='alert-dialog-slide-description'>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle>
    <GStyledSpanBox>
     <Grid container flexDirection={FLEX_DIR.ROW} justifyContent={FLEX.SPACE_BETWEEN}>
      <Grid item sm={6}>
       <GStyledSpanBox>
        <Typography variant={TYPOGRAPHY.H3}>{t('legends')} &nbsp;</Typography>
       </GStyledSpanBox>
      </Grid>
      <Grid item sm={6}>
       <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
        <IconTooltip title={t('legend.legends')} icon={ICON_NAME.LEGEND} color={theme.palette.grey[500]} iconOnly />
       </Grid>
      </Grid>
     </Grid>
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem />
   <DialogContent dividers sx={{ px: 3, py: 2 }}>
    <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN}>
     <Grid item sm={12}>
      {/* set a list for legend items */}
     </Grid>
    </Grid>
   </DialogContent>
  </Dialog>
 )
}

LegendDialog.propTypes = {
 open: PropTypes.bool,
 action: PropTypes.node,
 content: PropTypes.string,
 onClose: PropTypes.func
}

export default memo(LegendDialog)
