import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import { Box, Paper, Typography } from '@mui/material'
import { fileData } from 'component/upload'
import { fData } from 'util/format'
import { TYPOGRAPHY } from 'constant'

RejectionFiles.propTypes = {
 fileRejections: PropTypes.array
}

export default function RejectionFiles({ fileRejections }) {
 if (!fileRejections.length) {
  return null
 }

 return (
  <Paper
   variant='outlined'
   sx={{
    py: 1,
    px: 2,
    mt: 3,
    bgcolor: theme => alpha(theme.palette.error.main, 0.08),
    borderColor: theme => alpha(theme.palette.error.main, 0.24)
   }}>
   {fileRejections.map(({ file, errors }) => {
    const { path, size } = fileData(file)
    return (
     <Box key={path} sx={{ my: 1 }}>
      <Typography variant={TYPOGRAPHY.SUBTITLE2} noWrap> {path} - {size ? fData(size) : ''} </Typography>
          {errors.map(error => (
            <Box key={error.code} component='span' sx={{ typography: 'caption' }}> - {error.message} </Box>
          ))}
     </Box> )})}
  </Paper>
 )
}
