import PropTypes from 'prop-types'
import { Stack, Tooltip, Typography } from '@mui/material'
import { useIcon } from 'hook'
import { useTheme } from '@mui/material/styles'

const SPACING = 2.5

Block.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node,
}

function Block({ title, tooltip, children, sx, ...other }) {
  const { Icon, iconSrc } = useIcon('INFO')
  const theme = useTheme()
  return (
    <Stack spacing={1.5} sx={{ mb: SPACING, ...sx }} {...other}>
      <Stack direction="row" alignItems="center">
        <Typography variant="body2" sx={{ fontWeight: 'fontWeightMedium' }}>
          {title}
        </Typography>

        {tooltip && (
          <Tooltip title={tooltip}>
            <Icon
              icon={iconSrc}
              width={16}
              sx={{
                mx: 0.5,
                '&: MuiIconButton-paper': {
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            />
          </Tooltip>
        )}
      </Stack>

      {children}
    </Stack>
  )
}

export default Block
