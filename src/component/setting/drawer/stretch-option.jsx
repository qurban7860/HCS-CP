import { Stack, Box } from '@mui/material'
import { useSettingContext } from 'component/setting'
import { Iconify } from 'component/iconify'
import { StyledCard } from '../style'

function StretchOptions() {
  const { themeStretch, onToggleStretch } = useSettingContext()

  return (
    <StyledCard selected={themeStretch} onClick={onToggleStretch} sx={{ height: 48, px: 1 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: 0.24,
          transition: (theme) => theme.transitions.create('width'),
          ...(themeStretch && {
            width: 0.5,
          }),
        }}
      >
        <Iconify icon={themeStretch ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'} />

        <Box sx={{ flexGrow: 1, borderBottom: `solid 1.5px currentcolor` }} />

        <Iconify icon={themeStretch ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'} />
      </Stack>
    </StyledCard>
  )
}

export default StretchOptions
