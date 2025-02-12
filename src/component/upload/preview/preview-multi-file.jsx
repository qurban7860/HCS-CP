import { useState, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { Icon, ICON_NAME } from 'hook'
import { m, AnimatePresence } from 'framer-motion'
import { Button, ButtonGroup, Card, CardMedia, IconButton, Stack, Typography, Dialog, DialogTitle, Divider } from '@mui/material'
import { FileThumbnail, SkeletonPDF, Lightbox } from 'component'
import { varFade } from 'component/animate'
import { fileData, FORMAT_IMAGE_VISIBLE } from 'component/upload'
import { useTheme } from '@mui/material/styles'
import { bgBlur } from 'theme/style'
import { fData } from 'util/format'
import { ICON, RADIUS } from 'config/layout'

PreviewMultiFile.propTypes = {
 sx         : PropTypes.object,
 files      : PropTypes.array,
 onRemove   : PropTypes.func,
 onPreview  : PropTypes.func,
 thumbnail  : PropTypes.bool,
 machine    : PropTypes.string,
 drawingPage: PropTypes.bool,
 onLoadImage: PropTypes.func,
 onLoadPDF  : PropTypes.func,
 onDownload : PropTypes.func
}

function PreviewMultiFile({ thumbnail, onLoadImage, onLoadPDF, onDownload, files, onRemove, sx, machine, drawingPage }) {
 const theme                                   = useTheme()
 const [slides, setSlides]                     = useState([])
 const [selectedImage, setSelectedImage]       = useState(-1)
 const [fileFound, setFileFound]               = useState(null)
 const [verifiedAnchorEl, setVerifiedAnchorEl] = useState(null)
 const [pdf, setPDF]                           = useState(null)
 const [PDFName, setPDFName]                   = useState('')
 const [PDFViewerDialog, setPDFViewerDialog]   = useState(false)

 useEffect(() => {
  const Images = files?.filter(file => (file?.type || file?.fileType) && (file.type?.startsWith('image') || file.fileType?.startsWith('image')))
  setSlides(Images)
 }, [files])

 const handleExtensionsPopoverOpen = (event, file) => {
  setVerifiedAnchorEl(event.currentTarget)
  const data = file?.found
  data.machine = machine?._id || null
  setFileFound(data)
 }

 const handleExtensionsPopoverClose = () => {
  setVerifiedAnchorEl(null)
  setFileFound(null)
 }

 if (!files?.length) {
  return null
 }

 const handleOpenLightbox = async index => {
  setSelectedImage(index)
  const image = slides[index]
  if (!image?.isLoaded && image?._id && onLoadImage) {
   await onLoadImage(image?._id, index)
  }
 }

 const handleOpenPDF = async (pdfFile, fileName) => {
  if (pdfFile?._id) {
   onLoadPDF(pdfFile, fileName)
  } else {
   setPDFName(pdfFile?.name || fileName)
   setPDFViewerDialog(true)
   setPDF(pdfFile?.src)
  }
 }

 const handleCloseLightbox = () => {
  setSelectedImage(-1)
 }

 return (
  <AnimatePresence initial={false}>
   {files?.map((file, index) => {
    if (file) {
     const { key, name = '', size = 0 } = fileData(file)
     const fileType = file?.type?.split('/').pop().toLowerCase()
     const isNotFormatFile = typeof file === 'string'
     const fileName = name
     if (thumbnail) {
      return (
       <Card
        key={key || index}
        sx={{
         cursor        : 'pointer',
         position      : 'relative',
         display       : 'flex',
         flexDirection : 'column',
         alignItems    : 'center',
         justifyContent: 'center',
         '&:hover .button-group': {
          opacity: 1
         },
         width       : '100%',
         height      : 150,
         borderRadius: RADIUS.BORDER.borderRadius,
         my          : '0px !important'
        }}>
        <CardMedia onClick={() => FORMAT_IMAGE_VISIBLE.some(format => fileType?.match(format?.toLowerCase())) && handleOpenLightbox(index)}>
         <FileThumbnail imageView file={file} sx={{ position: 'absolute' }} imgSx={{ position: 'absolute' }} />
        </CardMedia>
        <ButtonGroup
         className='button-group'
         variant='contained'
         aria-label='outlined primary button group'
         sx={{
          position  : 'absolute',
          top       : 0,
          opacity   : 0,
          transition: 'opacity 0.3s ease-in-out',
          width     : '100%'
         }}>
         {FORMAT_IMAGE_VISIBLE.some(format => fileType?.match(format)) && (
          <Button sx={{ width: '50%', borderRadius: 0 }} onClick={() => (fileType === 'pdf' ? handleOpenPDF(file, fileName) : handleOpenLightbox(index))}>
           <Icon icon={ICON_NAME.PREVIEW} sx={{ ...ICON.SIZE_SM }} />
          </Button>
         )}
         {file?.uploaded && onDownload && (
          <Button sx={{ width: '50%', borderRadius: 0 }} onClick={() => onDownload(file)}>
           <Icon icon={ICON_NAME.DOWNLOAD} sx={{ ...ICON.SIZE_SM }} />
          </Button>
         )}
         <Button
          sx={{ width: FORMAT_IMAGE_VISIBLE.some(format => fileType?.match(format)) || (file?.uploaded && onDownload) ? '50%' : '100%', borderRadius: 0 }}
          color='error'
          onClick={() => onRemove(file)}>
          <Icon icon={ICON_NAME.CLOSE} sx={{ ...ICON.SIZE_SM }} />
         </Button>
        </ButtonGroup>

        <Stack
         padding={1}
         sx={{
          ...bgBlur({
           color: theme.palette.grey[900]
          }),
          width    : 1,
          left     : 0,
          bottom   : 0,
          position : 'absolute',
          color    : 'common.white',
          textAlign: 'center'
         }}>
         <Typography variant='body2'>
          {name.length > 14 ? name?.substring(0, 14) : name}
          {name?.length > 14 ? '...' : null}
         </Typography>
        </Stack>
        {file?.found && drawingPage && (
         <Button onClick={event => handleExtensionsPopoverOpen(event, file)} variant='contained' size='small' color='error' endIcon={<Icon icon={ICON_NAME.QUESTION_MARK}/>}>
          {t('already_exists.label')}
         </Button>
        )}
       </Card>
      )
     }
     return (
      <Stack
       key={key || index}
       component={m.div}
       {...varFade().inUp}
       spacing={2}
       direction='row'
       alignItems='center'
       sx={{
        my          : 1,
        px          : 1,
        py          : 0.75,
        borderRadius: 0.75,
        border      : `solid 1px ${theme.palette.divider}`,
        ...sx
       }}>
       <FileThumbnail file={file} />

       <Stack flexGrow={1} sx={{ minWidth: 0 }}>
        <Typography variant='subtitle2' noWrap>
         {isNotFormatFile ? file : name}
        </Typography>
        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
         {isNotFormatFile ? '' : fData(size)}
        </Typography>
       </Stack>

       {onRemove && (
        <IconButton edge='end' size='small' onClick={() => onRemove(file)}>
         <Icon icon={ICON_NAME.CLOSE} />
        </IconButton>
       )}
      </Stack>
     )
    }
    return null
   })}
   <Lightbox
    index={selectedImage}
    slides={slides}
    open={selectedImage >= 0}
    close={handleCloseLightbox}
    onGetCurrentIndex={index => handleOpenLightbox(index)}
    disabledTotal
    disabledDownload
    disabledSlideshow
   />
   {PDFViewerDialog && (
    <Dialog fullScreen open={PDFViewerDialog} onClose={() => setPDFViewerDialog(false)}>
     <DialogTitle variant='h3' sx={{ pb: 1, pt: 2, display: 'flex', justifyContent: 'space-between' }}>
        {t('pdf_view.label')}
      <Button variant='outlined' onClick={() => setPDFViewerDialog(false)}>
       {t('close.label')}
      </Button>
     </DialogTitle>
     <Divider variant='fullWidth' />
     {pdf ? <iframe title={PDFName} src={pdf} style={{ paddingBottom: 10 }} width='100%' height='842px' /> : <SkeletonPDF />}
    </Dialog>
   )}
  </AnimatePresence>
 )
}
export default memo(PreviewMultiFile)
