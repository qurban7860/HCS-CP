import { RadioGroup } from '@mui/material'
import { useSettingsContext } from '../setting-context'
import { StyledCard, StyledWrap, MaskControl, LayoutIcon } from 'component/setting'

const OPTIONS = ['vertical', 'horizontal', 'mini']

function LayoutOption() {
  const { themeLayout, onChangeLayout } = useSettingsContext()

  return (
    <RadioGroup name="themeLayout" value={themeLayout} onChange={onChangeLayout}>
      <StyledWrap sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {OPTIONS.map((layout) => (
          <StyledCard key={layout} selected={themeLayout === layout} sx={{ p: 0.75, height: 56 }}>
            <LayoutIcon layout={layout} />

            <MaskControl value={layout} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  )
}

export default LayoutOption
