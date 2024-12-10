import { RadioGroup } from '@mui/material'
import { Icon, StyledCard, StyledWrap, MaskControl, useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { KEY } from 'constant'
import { ICON_WEB_NAME } from 'config'

const DEFAULT = KEY.CONTRAST_DEFAULT
const BOLD = KEY.CONTRAST_BOLD

function ContrastOption() {
 const { themeContrast, onChangeContrast, themeMode } = useSettingContext()
 const theme = useTheme()

 const OPTIONS = [DEFAULT, BOLD]

 return (
  <RadioGroup name='themeContrast' value={themeContrast} onChange={onChangeContrast}>
   <StyledWrap>
    {OPTIONS.map((contrast, index) => (
     <StyledCard key={index} selected={themeContrast === BOLD || DEFAULT} mode={themeMode}>
      <Icon
       icon={contrast === DEFAULT ? ICON_WEB_NAME.CONTRAST_OFF : ICON_WEB_NAME.CONTRAST_ON}
       color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}
       alt='contrast-box'
      />
      <MaskControl value={contrast} />
     </StyledCard>
    ))}
   </StyledWrap>
  </RadioGroup>
 )
}

export default ContrastOption
