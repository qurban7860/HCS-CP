import { RadioGroup } from '@mui/material'
import { SvgColor } from '../../svg-color'
import { StyledCard, StyledWrap, MaskControl, useSettingContext } from 'component/setting'

const OPTIONS = ['default', 'bold']

function ContrastOption() {
  const { themeContrast, onChangeContrast } = useSettingContext()

  return (
    <RadioGroup name="themeContrast" value={themeContrast} onChange={onChangeContrast}>
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>
            <SvgColor
              icon={`/assets/icons/setting/${
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
