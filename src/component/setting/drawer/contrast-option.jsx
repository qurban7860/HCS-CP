import { RadioGroup } from '@mui/material'
import { SvgColor } from '../../svg-color'
import { StyledCard, StyledWrap, MaskControl, useSettingsContext } from 'component/setting'

const OPTIONS = ['default', 'bold']

function ContrastOption() {
  const { themeContrast, onChangeContrast } = useSettingsContext()

  return (
    <RadioGroup name="themeContrast" value={themeContrast} onChange={onChangeContrast}>
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>
            <SvgColor
              src={`/assets/icons/setting/${
                contrast === 'bold' ? 'ic_contrast_bold' : 'ic_contrast'
              }.svg`}
            />

            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}

export default ContrastOption
