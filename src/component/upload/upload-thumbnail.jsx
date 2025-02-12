import PropTypes from 'prop-types'
import { Box, Tooltip, Stack } from '@mui/material'
import { DownloadButton } from 'component'
import { fileData, fileFormat, fileThumb } from './util'

FileThumbnail.propTypes = {
 sx        : PropTypes.object,
 imgSx     : PropTypes.object,
 tooltip   : PropTypes.bool,
 imageView : PropTypes.bool,
 onDownload: PropTypes.func,
 file      : PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default function FileThumbnail({ file, tooltip, imageView, onDownload, sx, imgSx }) {
 const { name = '', path = '', extension = '', preview = '' } = fileData(file)
 const format                                                 = fileFormat(path.toLowerCase() || preview.toLowerCase() || extension.toLowerCase())?.toLowerCase()
 const renderContent                                          = format === 'images' && imageView ? (
   <Box component='img' src={preview} sx={{ width: 1, height: 1, pb: 2.5, flexShrink: 0, objectFit: 'cover', ...imgSx }} />
  ) : (
   <Box
    component='img'
    src={fileThumb(format.toLowerCase())}
    sx={{
     width: 70,
     height: 70,
     flexShrink: 0,
     border: 'none',
     ...sx
    }}
   />
  )

 if (tooltip) {
  return (
   <Tooltip title={name}>
    <Stack
     flexShrink={0}
     component='span'
     alignItems='center'
     justifyContent='center'
     sx={{
      width: 'fit-content',
      height: 'inherit'
     }}>
     {renderContent}
     {onDownload && <DownloadButton onDownload={onDownload} />}
    </Stack>
   </Tooltip>
  )
 }

 return (
  <Stack
   flexShrink={0}
   component='span'
   alignItems='center'
   justifyContent='center'
   sx={{ width: 'fit-content', height: 'inherit'}}>
   {renderContent}
   {onDownload && <DownloadButton onDownload={onDownload} />}
  </Stack>
 )
}
