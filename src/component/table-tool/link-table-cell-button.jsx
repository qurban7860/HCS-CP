import PropTypes from 'prop-types'
import { TableCell } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'
import { StyledTooltip } from 'theme/style'
import { Iconify } from 'component/iconify'
import { ICON } from 'constant/icon'

const theme = createTheme({
  palette: {
    success: green,
  },
})

LinkTableCellButtons.propTypes = {
  align: PropTypes.string,
  onClick: PropTypes.func,
  moveIcon: PropTypes.bool,
}

function LinkTableCellButton({ align, onClick, moveIcon }) {
  return (
    <TableCell align={align}>
      {moveIcon && onClick && (
        <StyledTooltip
          onClick={onClick}
          title={ICON.MOVE_MACHINE.heading}
          placement="top"
          disableFocusListener
          tooltipcolor={theme.palette.primary.main}
        >
          <Iconify
            icon={ICON.MOVE_MACHINE.icon}
            color={theme.palette.primary.main}
            width="1.7em"
            sx={{ mb: -0.5, mr: 0.5, cursor: 'pointer' }}
          />
        </StyledTooltip>
      )}
    </TableCell>
  )
}

export default LinkTableCellButton
