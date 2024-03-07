import PropTypes from 'prop-types'
import { TableCell, Link } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useLimitString } from 'hook'
import { StyledTooltip } from 'theme/style'

LinkTableCellWithIcon.propTypes = {
  align: PropTypes.string,
  onClick: PropTypes.func,
  param: PropTypes.string,
  isVerified: PropTypes.bool,
}

function LinkTableCellWithIcon({ align, onClick, param, isVerified }) {
  const limit = 25
  return (
    <TableCell align={align}>
      {/* // TODO: icons //
      import VerificationIcon from '../Icons/VerificationIcon' */}
      {/* <VerificationIcon isVerified={isVerified} /> */}
      <StyledTooltip title={param.length > limit ? param : ''} placement="top">
        <Link
          onClick={onClick}
          color="inherit"
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            fontWeight: 'bold',
            '&:hover': {
              color: (themes) => alpha(themes.palette.info.main, 0.98),
            },
          }}
        >
          {useLimitString(param, limit)}
        </Link>
      </StyledTooltip>
    </TableCell>
  )
}

export default LinkTableCellWithIcon
