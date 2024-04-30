import PropTypes from 'prop-types'
import { TableCell } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'
import { GStyledTooltip } from 'theme/style'
import { Iconify } from 'component/iconify'
import { ICON } from 'constant/icon'

const theme = createTheme({
  palette: {
    success: green
  }
})

LinkTableCellButton.propTypes = {
  align: PropTypes.string,
  onClick: PropTypes.func,
  moveIcon: PropTypes.bool
}

function LinkTableCellButton({ align, onClick, moveIcon }) {
  return (
    <TableCell align={align}>
      {moveIcon && onClick && (
        <GStyledTooltip
          onClick={onClick}
          title={ICON.MOVE_MACHINE.heading}
          placement="top"
          disableFocusListener
          tooltipcolor={theme.palette.primary.main}>
          <Iconify icon={ICON.MOVE_MACHINE.icon} color={theme.palette.primary.main} width="1.7em" sx={{ mb: -0.5, mr: 0.5, cursor: 'pointer' }} />
        </GStyledTooltip>
      )}
    </TableCell>
  )
}

export default LinkTableCellButton
