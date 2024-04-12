import PropTypes from 'prop-types'
import { TableCell, Link } from '@mui/material'
import { alpha } from '@mui/material/styles'
// TODO: icons
// import OpenInNewPage from '../Icons/OpenInNewPage'

LinkDialogTableCellTarget.propTypes = {
  align: PropTypes.string,
  onViewRow: PropTypes.func,
  onClick: PropTypes.func,
  param: PropTypes.string,
}

function LinkDialogTableCellTarget({ align, onViewRow, onClick, param }) {
  return (
    <TableCell className="ellipsis-cell">
      <Link
        onClick={onViewRow}
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
        {param}
      </Link>
      {/* <Button disableTouchRipple sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationStyle: 'dotted',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',      // Prevent text from wrapping
            overflow: 'hidden',       // Hide any overflow
            textOverflow: 'ellipsis', // Add ellipsis for overflowed text
            background:'none',
            color:'black',
            justifyContent:'flex-start',
            p:0,
            m:0,
            width:'100%',
            '&:hover': {
              color: (theme) => alpha(theme.palette.info.main, 0.98),
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              background:'none',
            }
          }}
          onClick={onViewRow}>
                {param}
        </Button> */}
      {/* <OpenInNewPage onClick={onClick} /> */}
    </TableCell>
  )
}

export default LinkDialogTableCellTarget
