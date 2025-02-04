import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { useTheme, Box, Stack, Button, IconButton, Typography } from '@mui/material'
import { UploadExtensionPopover, RejectionFiles } from 'component/upload'
import { styled, alpha } from '@mui/material/styles'
import { GStyledSpanBox } from 'theme/style'
import { ALLOWED_DOC_EXT, ALLOWED_IMG_EXT } from 'config/upload'
import { ICON } from 'config/layout'
import { FLEX, FLEX_DIR, TYPOGRAPHY, KEY } from 'constant'
import { PreviewMultiFile, PreviewSingleFile } from './preview'

const StyledDropZone = styled('div')(({ theme, mode }) => ({
 outline        : 'none',
 cursor         : 'pointer',
 overflow       : 'hidden',
 position       : 'relative',
 padding        : theme.spacing(5),
 borderRadius   : theme.shape.borderRadius,
 transition     : theme.transitions.create('padding'),
 backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[800],
 height         : 'auto',
 border         : `1px solid ${alpha(theme.palette.grey[200], 0.32)}`,
 '&:hover'      : { opacity: 0.72 }
}))

Upload.propTypes = {
 sx         : PropTypes.object,
 error      : PropTypes.bool,
 files      : PropTypes.array,
 file       : PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
 disabled   : PropTypes.bool,
 multiple   : PropTypes.bool,
 onDelete   : PropTypes.func,
 onPreview  : PropTypes.func,
 onRemove   : PropTypes.func,
 onUpload   : PropTypes.func,
 thumbnail  : PropTypes.bool,
 rows       : PropTypes.bool,
 hideFiles  : PropTypes.bool,
 helperText : PropTypes.node,
 onRemoveAll: PropTypes.func,
 machine    : PropTypes.string,
 drawingPage: PropTypes.bool,
 imagesOnly : PropTypes.bool,
 dropZone   : PropTypes.bool,
 onLoadImage: PropTypes.func,
 onLoadPDF  : PropTypes.func,
 onDownload : PropTypes.func
}

export default function Upload({
 disabled,
 multiple = false,
 error,
 helperText,
 file,
 onDelete,
 onPreview,
 files,
 thumbnail,
 rows,
 hideFiles,
 onUpload,
 onRemove,
 onRemoveAll,
 machine,
 drawingPage,
 onLoadImage,
 onLoadPDF,
 onDownload,
 imagesOnly,
 dropZone,
 sx,
 ...other
}) {
 const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
  multiple,
  disabled,
  ...other
 })
 const [verifiedAnchorEl, setVerifiedAnchorEl] = useState(null)
 const { themeMode }                           = useSettingContext()
 const theme                                   = useTheme()
 const handleExtensionsPopoverOpen = event => {
  setVerifiedAnchorEl(event.currentTarget)
 }

 const handleExtensionsPopoverClose = () => {
  setVerifiedAnchorEl(null)
 }
 const hasFile = !!file && !multiple
 const hasFiles = files && multiple && files.length > 0
 const isError = isDragReject || !!error
 const fileExtension = file?.name?.split('.').pop().toLowerCase()

 return (
  <Box sx={{ width: 1, position: 'relative', ...sx }}>
   {dropZone && (
    <Fragment>
     <StyledDropZone
      mode={themeMode}
      {...getRootProps()}
      sx={{
       ...(isDragActive && {
        opacity: 0.42,
        height: '232px'
       }),
       ...(isError && {
        color: 'error.main',
        bgcolor: 'error.lighter',
        borderColor: 'error.light'
       }),
       ...(disabled && {
        opacity: 0.48,
        height: '165px',
        pointerEvents: 'none'
       }),
       ...(hasFile && {
        padding: '8% 0',
        width: '250px',
        height: '165px',
        // maxWidth:"100%",
        // height: "100%",
        objectFit: 'cover'
       })
      }}>
      <input {...getInputProps()} />
      <Placeholder sx={{ ...(hasFile && {opacity: 0 }) }} />
      {hasFile && <PreviewSingleFile file={file} />}
     </StyledDropZone>
     <GStyledSpanBox display={FLEX.FLEX} justifyContent={FLEX.FLEX_END} mr={1} gap={1}>
                <Typography variant={TYPOGRAPHY.CAPTION}  sx={{ alignItems: 'center', mt: 0.5 }}>
                    {t('allowed_format.allowed_formats.label')}
                </Typography>
            <Icon onClick={handleExtensionsPopoverOpen} icon={ICON_NAME.QUESTION_MARK} color={theme.palette.howick.blue} sx={{ cursor: 'pointer', ...ICON.SIZE_XS }} />
        <UploadExtensionPopover open={verifiedAnchorEl} onClose={handleExtensionsPopoverClose} imagesOnly={imagesOnly} />
    </GStyledSpanBox>
    </Fragment>
   )}
   <RejectionFiles fileRejections={fileRejections} />
   {hasFile && onDelete && (
    <IconButton
     size='small'
     onClick={onDelete}
     sx={{
      top      : 16,
      left     : 210,
      zIndex   : 9,
      height   : '160',
      position : 'absolute',
      color    : theme => alpha(theme.palette.common.white, 0.8),
      bgcolor  : theme => alpha(theme.palette.grey[900], 0.72),
      '&:hover': {
       bgcolor: theme => alpha(theme.palette.grey[900], 0.48)
      }
     }}>
     <Icon icon={ICON_NAME.CLOSE} sx={{ ...ICON.SIZE_XS }} />
    </IconButton>
   )}

   {hasFile && onPreview && ALLOWED_IMG_EXT.includes(fileExtension) && (
    <IconButton
     size='small'
     onClick={onPreview}
     sx={{
      top      : 16,
      left     : 176,
      zIndex   : 9,
      height   : '150',
      position : 'absolute',
      color    : theme => alpha(theme.palette.common.white, 0.8),
      bgcolor  : theme => alpha(theme.palette.grey[900], 0.72),
      '&:hover': {
       bgcolor: theme => alpha(theme.palette.grey[900], 0.48)
      }}}>
     <Icon icon={ICON_NAME.PREVIEW} sx={{ ...ICON.SIZE_XS }}  />
    </IconButton>
   )}

   {hasFile && onPreview && ALLOWED_DOC_EXT.includes(fileExtension) && (
    <IconButton
     size='small'
     sx={{
      top: 80,
      left: 2,
      zIndex: 9,
      position: 'absolute',
      '&:hover': { bgcolor: 'transparent' }
     }}>
     <Icon icon={fileExtension} color={document.color[fileExtension]} width={60} sx={{ p: 1, color: document.color[fileExtension] }} />
     <Typography variant={TYPOGRAPHY.BODY2} width='170px' sx={{ overflowWrap: 'break-word' }}>
      {file?.name}
     </Typography>
    </IconButton>
   )}

   {(hasFiles || !dropZone) && (
    <Fragment>
     <Box
      gap={2}
      display={rows ? '' : 'grid'}
      sx={{ width: '100%', alignItems: 'center' }}
      gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(5, 1fr)',
                            lg: 'repeat(6, 1fr)',
                            xl: 'repeat(8, 1fr)'
                           }}>
      {hasFiles && !hideFiles && (
        <PreviewMultiFile onLoadImage={onLoadImage} onLoadPDF={onLoadPDF} onDownload={onDownload} machine={machine || ''} drawingPage files={files} thumbnail={thumbnail} onRemove={onRemove} />
      )}
      {!dropZone && (
       <Button {...getRootProps()} variant='outlined' sx={{ display: 'block', height: '150px' }}>
        <input {...getInputProps()} />
        <Icon icon={ICON_NAME.ADD} width={50} />
        <Typography variant={TYPOGRAPHY.OVERLINE1}>{t('attach_file.label')}</Typography>
       </Button>
      )}

     </Box>
     {hasFiles && (
      <Stack direction={FLEX_DIR.ROW} justifyContent={FLEX.FLEX_END} spacing={1.5} sx={{ mt: 1 }}>
       {onRemoveAll && (
        <Button color='error' variant='outlined' size='small' onClick={onRemoveAll}>
        {t('remove_all.label')}
        </Button>
       )}
      </Stack>
     )}
    </Fragment>
   )}
   {helperText && helperText}
  </Box>
 )
}

Placeholder.propTypes = {
 sx: PropTypes.object
}

function Placeholder({ sx, ...other }) {
  const theme = useTheme()
  const { themeMode } = useSettingContext()
 return (
  <Stack
   spacing={5}
   alignItems='center'
   justifyContent='center'
   direction={{ xs: 'column', md: 'row' }}
   sx={{
    width: 1,
    height: '150px',
    textAlign: { xs: 'center', md: 'left' },
    ...sx
   }}
   {...other}>
   <div>
    <Icon icon={ICON_NAME.ATTACHMENTS} width={20} color={theme.palette.grey[500]} />
    <Typography variant={TYPOGRAPHY.OVERLINE1} sx={{ color: 'text.secondary' }}>
     <Trans
      i18nKey='drop_select.label'
      components={{ select: <Typography variant={TYPOGRAPHY.OVERLINE1} component='span' sx={{ mx: 0.5, color: themeMode === KEY.LIGHT ? 'primary.main' : 'howick.orange', fontWeight: 'bold' }} />}}
     />
    </Typography>
   </div>
  </Stack>
 )
}
