import { styled, alpha } from '@mui/material/styles'
import { TableContainer, TablePagination, TableRow, TableCell, ListItemText } from '@mui/material'
import { KEY } from 'constant'

export const StyledTablePagination = styled(TablePagination)(({ theme, mode, page, data, rowsPerPage }) => ({
 '.MuiTablePagination-toolbar': {
  backgroundColor: mode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[800],
  height: '5px',
  width: '!important 200px',
  '& .MuiTablePagination-actions': {
   '& .MuiIconButton-root': {
    '&:first-of-type': {
     color: page <= 0 ? (mode === KEY.LIGHT ? theme.palette.grey[100] : theme.palette.grey[700]) : mode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.howick.orange
    },
    '&:nth-of-type(2)': {
     color: page <= 0 ? (mode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[700]) : mode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.howick.orange
    },
    '&:nth-of-type(3)': {
     color:
      page === Math.ceil((data?.length ?? 0) / rowsPerPage) - 1
       ? mode === KEY.LIGHT
         ? theme.palette.grey[100]
         : theme.palette.grey[700]
       : mode === KEY.LIGHT
       ? theme.palette.grey[800]
       : theme.palette.howick.orange
    },
    '&:last-of-type': {
     color:
      page === Math.ceil((data?.length ?? 0) / rowsPerPage) - 1
       ? mode === KEY.LIGHT
         ? theme.palette.grey[100]
         : theme.palette.grey[700]
       : mode === KEY.LIGHT
       ? theme.palette.grey[800]
       : theme.palette.howick.orange
    }
   }
  }
 }
}))

export const StyledHeaderTableCell = styled(({ theme, mode, item, ...other }) => <TableCell {...other} />)(({ theme, mode, item }) => ({
 backgroundColor: mode === KEY.LIGHT ? theme.palette.background.default : theme.palette.grey[800],
 borderBottom: `2px solid ${mode === KEY.LIGHT ? theme.palette.howick.bronze : theme.palette.howick.blue} !important`,
 color: mode === KEY.DARK ? 'common.white' : 'common.black',
 fontWeight: 'bold',
 fontSize: '1.1rem',
 padding: '0.5rem 1rem',
 paddingBottom: '1rem',
 overflow: 'hidden',
 textOverflow: 'ellipsis',
 whiteSpace: 'nowrap',
 position: 'sticky',
 top: 0,
 zIndex: 1
 //  width: item.key === KEY.SERIAL_NO ? '5%' : item.key === KEY.NAME ? '30%' : item.key === 'isActive' ? '5%' : `calc(100% / ${HEADER.length})`
}))

export const StyledIconListItemText = styled(({ theme, inActive, ...other }) => <ListItemText {...other} />)(({ theme, inActive }) => ({
 justifyContent: 'center',
 alignItems: 'center',
 display: 'flex',
 color: !inActive ? theme.palette.error.main : theme.palette.burnIn.main
}))

export const StyledPopTableCell = styled(TableCell)(({ theme, mode }) => ({
 fontWeight: 'bold',
 fontSize: '1rem'
}))

export const StyledTableRow = styled(({ theme, mode, index, machine, ...other }) => <TableRow {...other} />)(({ theme, mode, index, machine }) => ({
 backgroundColor:
  index % 2
   ? mode === KEY.DARK
     ? alpha(theme.palette.grey[900], 0.5)
     : alpha(theme.palette.grey[100], 0.4)
   : mode === KEY.DARK
   ? alpha(theme.palette.grey[800], 0.5)
   : alpha(theme.palette.table.cellEven, 0.9),
 cursor: 'pointer',
 '&:hover': {
  backgroundColor: mode === KEY.DARK ? theme.palette.grey[700] : theme.palette.common.white
 }
 //  width: machine?.serialNo ? '5%' : machine?.name ? '30%' : machine?.isActive.toString() ? '5%' : `calc(100% / ${HEADER.length})`
}))

export const StyledScrollTableContainer = styled(TableContainer)(({ theme }) => ({
 position: 'relative',
 overflow: 'auto',
 maxHeight: 630
}))
