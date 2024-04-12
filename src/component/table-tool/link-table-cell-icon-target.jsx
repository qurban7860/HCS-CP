import PropTypes from 'prop-types'
import { TableCell, Link } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useLimitString } from 'hook'
// TODO: icons
// import VerificationIcon from '../Icons/VerificationIcon'
// import OpenInNewPage from '../Icons/OpenInNewPage'

LinkTableCellWithIconTargetBlank.propTypes = {
  align: PropTypes.string,
  onViewRow: PropTypes.func,
  onClick: PropTypes.func,
  param: PropTypes.string,
  isVerified: PropTypes.bool,
}

function LinkTableCellWithIconTargetBlank({ align, onViewRow, onClick, param, isVerified }) {
  return (
    <TableCell align={align} sx={{ minWidth: '130px' }}>
      {isVerified !== undefined && <VerificationIcon isVerified={isVerified} />}
      <Link
        onClick={onViewRow}
        color="inherit"
        sx={{
          mt: 0.5,
          cursor: 'pointer',
          textDecoration: 'underline',
          textDecorationStyle: 'dotted',
          fontWeight: 'bold',
          '&:hover': {
            color: (themes) => alpha(themes.palette.info.main, 0.98),
          },
        }}
      >
        {useLimitString(param, 30)}
      </Link>
      <OpenInNewPage onClick={onClick} />
    </TableCell>
  )
}

export default LinkTableCellWithIconTargetBlank
