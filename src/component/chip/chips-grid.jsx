import PropTypes from 'prop-types'
import { useSettingContext, useUIMorph } from 'hook'
import { useTheme, Chip, Typography } from '@mui/material'
import { GStyledNoPaddingFieldGrid, GStyledNoPaddingFieldChip } from 'theme/style'
import { SIZE, TYPOGRAPHY } from 'constant'
import { roleCoverUp, roleColr } from 'util/role'

const ChipsGrid = ({ chips, chipKey, isRole }) => {
 const { themeMode } = useSettingContext()
 const { isDesktop } = useUIMorph()
 const theme = useTheme()

 return chips && typeof chips === 'object' && chips.length > 0 ? (
  <GStyledNoPaddingFieldGrid container mode={themeMode}>
   {chips?.map((chip, index) => (
    <GStyledNoPaddingFieldChip
     key={index}
     mode={themeMode}
     roleColr={roleColr(chip, theme, themeMode)}
     label={<Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE2 : TYPOGRAPHY.OVERLINE_MINI}>{isRole ? roleCoverUp(chip) : chip[chipKey]}</Typography>}
     size={SIZE.SMALL}
    />
   ))}
  </GStyledNoPaddingFieldGrid>
 ) : (
  chips && typeof chips === 'string' && chips?.trim().length > 0 && <Chip label={chips} sx={{ m: 0.2 }} />
 )
}

ChipsGrid.propTypes = {
 chips: PropTypes.array,
 chipKey: PropTypes.string,
 isRole: PropTypes.bool
}

export default ChipsGrid
