import PropTypes from 'prop-types'
import { TableCell } from '@mui/material'
import { alpha, createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'
import { StyledTooltip } from 'theme/style'
import { Iconify } from 'component/iconify'
import { ICON } from 'constant/icon'
import { useLimitString } from 'hook'

LinkTableCell.propTypes = {
  align: PropTypes.string,
  onClick: PropTypes.func,
  param: PropTypes.string,
  stringLength: PropTypes.number,
  isDefault: PropTypes.bool,
}

function LinkTableCell({ align, onClick, param, stringLength, isDefault }) {
  const theme = createTheme({
    palette: {
      success: green,
    },
  })

  return (
    <TableCell
      className="ellipsis-cell"
      onClick={onClick}
      align={align}
      color="inherit"
      sx={{
        cursor: 'pointer',
        textDecoration: 'underline',
        textDecorationStyle: 'dotted',
        fontWeight: 'bold',
        whiteSpace: 'nowrap', // Prevent text from wrapping
        overflow: 'hidden', // Hide any overflow
        textOverflow: 'ellipsis', // Add ellipsis for overflowed text
        maxWidth: '400px',
        '&:hover': {
          color: () => alpha(theme.palette.info.main, 0.98),
        },
      }}
    >
      {useLimitString(param, stringLength || 30)}
      {isDefault && (
        <StyledTooltip
          onClick={onClick}
          title={ICON.DEFAULT.heading}
          placement="top"
          disableFocusListener
          tooltipcolor={theme.palette.primary.main}
        >
          <Iconify
            icon={ICON.DEFAULT.icon}
            color={theme.palette.primary.main}
            width="17px"
            height="17px"
            sx={{ mb: -0.3, ml: 0.5, cursor: 'pointer' }}
          />
        </StyledTooltip>
      )}
    </TableCell>
  )
}

export default LinkTableCell
