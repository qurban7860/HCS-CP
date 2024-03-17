import PropTypes from 'prop-types'
import { alpha, styled } from '@mui/material/styles'
import { CardActionArea, Radio, FormControlLabel, Stack, Box } from '@mui/material'
import { NAV, RADIUS } from 'config'

export const StyledWrap = styled(Box)(() => ({
  gap: 8,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
}))

export const StyledCard = styled(CardActionArea, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected, theme }) => ({
  height: NAV.H_OPTION,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${alpha(theme.palette.grey[800], 0.22)}`,
  ...(selected && {
    color: theme.palette.primary.main,
    // boxShadow: theme.customShadow.z12,
    borderColor: alpha(theme.palette.grey[800], 0.22),
  }),
  ...RADIUS.BORDER,
}))

export const StyledCircleColor = styled('div', {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected, color, theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: color,
  transition: theme.transitions.create(['width', 'height'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  ...(selected && {
    width: 24,
    height: 24,
    boxShadow: `-2px 4px 8px 0px ${alpha(color, 0.48)}`,
  }),
}))

MaskControl.propTypes = {
  value: PropTypes.string,
}

export function MaskControl({ value }) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  )
}

LayoutIcon.propTypes = {
  layout: PropTypes.string,
}

export function LayoutIcon({ layout }) {
  const WIDTH = 16

  const HEIGHT = 10

  const SPACING = 0.5

  const RADIUS = 0.5

  const isNavHorizontal = layout === 'horizontal'

  const isNavMini = layout === 'mini'

  const styles = {
    width: 1,
    height: 1,
    borderRadius: RADIUS,
    position: 'absolute',
  }

  return (
    <Stack direction={layout === 'horizontal' ? 'column' : 'row'} sx={{ width: 1, height: 1 }}>
      <Box
        sx={{
          mr: SPACING,
          width: WIDTH,
          opacity: 0.72,
          borderRadius: RADIUS,
          bgcolor: 'currentColor',
          ...(isNavHorizontal && {
            width: 1,
            mb: SPACING,
            height: HEIGHT,
            borderRadius: RADIUS / 1.5,
          }),
          ...(isNavMini && {
            width: WIDTH / 2,
            borderRadius: RADIUS / 2,
          }),
        }}
      />

      <Box sx={{ flexGrow: 1, position: 'relative', borderRadius: RADIUS }}>
        <Box sx={{ ...styles, opacity: 0.16, bgcolor: 'currentColor' }} />
        <Box sx={{ ...styles, opacity: 0.48, border: `solid 1px currentColor` }} />
      </Box>
    </Stack>
  )
}
