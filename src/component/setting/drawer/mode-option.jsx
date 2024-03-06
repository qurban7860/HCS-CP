import { RadioGroup } from '@mui/material'
import SvgColor from '../../svg-color'
import { useSettingsContext } from '../setting-context'
import { StyledCard, StyledWrap, MaskControl } from '../style'

const OPTIONS = ['light', 'dark']

function ModeOption() {
  const { themeMode, onChangeMode } = useSettingsContext()

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard key={mode} selected={themeMode === mode}>
            <SvgColor
              src={`/assets/icons/setting/${mode === 'light' ? 'ic_sun' : 'ic_moon'}.svg`}
            />
            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}

export default ModeOption
