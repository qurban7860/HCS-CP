import { RadioGroup } from '@mui/material'
import { StyledCard, StyledWrap, MaskControl, useSettingContext } from 'hook'
import { useIcon } from 'hook'
import { KEY } from 'constant'
import { ICON_WEB_NAME } from 'config'

const DEFAULT = KEY.CONTRAST_DEFAULT
const BOLD = KEY.CONTRAST_BOLD

function ContrastOption() {
  const { themeContrast, onChangeContrast } = useSettingContext()
  const { Icon: IconContrast, iconSrc: contrastOffSrc } = useIcon(ICON_WEB_NAME.CONTRAST_OFF)
  const { iconSrc: contrastOnSrc } = useIcon(ICON_WEB_NAME.CONTRAST_ON)

  const OPTIONS = [DEFAULT, BOLD]

  return (
    <RadioGroup name="themeContrast" value={themeContrast} onChange={onChangeContrast}>
      <StyledWrap>
        {OPTIONS.map((contrast, index) => (
          <StyledCard key={index} selected={themeContrast === BOLD || DEFAULT}>
            <IconContrast icon={contrast === DEFAULT ? contrastOffSrc : contrastOnSrc} alt="contrast-box" />
            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}

export default ContrastOption
