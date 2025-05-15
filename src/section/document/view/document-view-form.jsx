import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import download from 'downloadjs'
import b64toBlob from 'b64-to-blob'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { snack, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { getDocument, resetDocument, getDocumentFile } from 'store/slice/document/document'
import { PATH_MACHINE } from 'route/path'
import { useDefaultValues } from '../default-values/default-values'
import { useTheme, Grid, Box, Dialog, DialogTitle, Divider, Button, Card, } from '@mui/material'
import { GridViewField, GridViewTitle, GalleryItem, Lightbox, SkeletonPDF, BackButton } from 'component'
import { GCardOption, GStyledTopBorderDivider } from 'theme/style'
import { REGEX, FLEX_DIR } from 'constant'
import { handleError } from 'util'

/**
 * View document form
 * @returns {JSX.Element}
 */
function DocumentViewForm({ isDrawingPage }) {
  const [slides, setSlides] = useState([])
  const [selectedImage, setSelectedImage] = useState(-1)
  const [pdf, setPDF] = useState(null)
  const [PDFName, setPDFName] = useState('')
  const [PDFViewerDialog, setPDFViewerDialog] = useState(false)

  const { document, isLoading } = useSelector(state => state.document)
  const { id, machineId } = useParams()

  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const navigate = useNavigate()
  const regEx = new RegExp(REGEX.SUCCESS_CODE)
  const isMobile = useResponsive('down', 'sm')

  const defaultValues = useDefaultValues({ document })

  useEffect(() => {
    dispatch(getDocument({ id, machine: machineId }))
    return () => {
      dispatch(resetDocument())
    }
  }, [dispatch, id])

  useEffect(() => {
    const newSlides = defaultValues?.files
      ?.map(file => {
        if (file?.fileType && file.fileType.startsWith('image')) {
          return {
            thumbnail: `data:image/png;base64, ${file.thumbnail}`,
            src: `data:image/png;base64, ${file.thumbnail}`,
            downloadFilename: `${file?.name}.${file?.extension}`,
            name: file?.name,
            extension: file?.extension,
            fileType: file?.fileType,
            isLoaded: false,
            _id: file?._id,
            width: '100%',
            height: '100%'
          }
        }
        return null
      })
      ?.filter(Boolean)
    setSlides(newSlides || [])
  }, [defaultValues?.files?.length])

  const handleOpenLightbox = async index => {
    setSelectedImage(index)
    const image = slides[index]
    if (!image?.isLoaded && image?.fileType?.startsWith('image')) {
      try {
        const response = await dispatch(getDocumentFile({ id, fileId: image?._id }))
        if (regEx.test(response.status)) {
          const updatedSlides = [
            ...slides.slice(0, index),
            {
              ...slides[index],
              src: `data:image/png;base64, ${response.data}`,
              isLoaded: true
            },
            ...slides.slice(index + 1)
          ]
          setSlides(updatedSlides)
        }
      } catch (error) {
        console.error(t('responses.error.loading_file'), error)
      }
    }
  }

  const handleCloseLightbox = () => setSelectedImage(-1)

  const handleDownloadFile = (fileId, fileName, fileExtension) => {
    dispatch(getDocumentFile({ id, fileId }))
      .then(res => {
        if (regEx.test(res.status)) {
          download(atob(res.data), `${fileName}.${fileExtension}`, { type: fileExtension })
          snack(res.statusText)
        } else {
          snack(res.statusText, { variant: `error` })
        }
      })
      .catch(err => {
        snack(handleError(err), { variant: `error` })
      })
  }

  const handleOpenFile = async (fileId, fileName, fileExtension) => {
    setPDFName(`${fileName}.${fileExtension}`)
    setPDFViewerDialog(true)
    setPDF(null)
    try {
      const response = await dispatch(getDocumentFile({ id, fileId }))
      if (regEx.test(response.status)) {
        const blob = b64toBlob(encodeURI(response.data), 'application/pdf')
        const url = URL.createObjectURL(blob)
        setPDF(url)
      } else {
        snack(response.statusText, { variant: 'error' })
      }
    } catch (error) {
      if (typeof error === 'string') {
        snack(error, { variant: 'error' })
      } else if (error?.message && typeof error?.message === 'string') {
        snack(error?.message, { variant: 'error' })
      } else {
        snack(t('responses.error.unexpected_error'), { variant: 'error' })
      }
    }
  }

  const onBackDocuments = () => navigate(PATH_MACHINE.machines.documents.list(machineId));
  const onBackDrawings = () => navigate(PATH_MACHINE.machines.drawings.list(machineId));

  return (
    <>
      <Fragment>
        <Grid container direction={{ xs: 'column', md: 'row' }} flex={1} rowSpacing={2} gridAutoFlow={isMobile ? FLEX_DIR.COLUMN : FLEX_DIR.ROW} columnSpacing={2}>
          <Grid item xs={12} sm={12} lg={12}>
            <BackButton handleBackAction={isDrawingPage ? onBackDrawings : onBackDocuments} />
            <Box mb={5} >
              <Card {...GCardOption(themeMode)}>
                <GStyledTopBorderDivider mode={themeMode} />
                <Grid container spacing={1} p={1.5}>

                  <GridViewField heading="Display Name" isLoading={isLoading} gridSize={9} >
                    {defaultValues?.displayName}
                  </GridViewField>
                  <GridViewField heading="Version" isLoading={isLoading} gridSize={3} >
                    {defaultValues?.versionPrefix} {defaultValues?.version}
                  </GridViewField>
                  <GridViewField heading="Document Category" isLoading={isLoading} gridSize={3} >
                    {defaultValues?.docCategory}
                  </GridViewField>
                  <GridViewField heading='Document Type' isLoading={isLoading} gridSize={3} >
                    {defaultValues?.docType}
                  </GridViewField>
                  <GridViewField heading='Reference Number' isLoading={isLoading} gridSize={3} >
                    {defaultValues?.referenceNumber}
                  </GridViewField>
                  <GridViewField heading='Stock Number' isLoading={isLoading} gridSize={3} >
                    {defaultValues?.stockNumber}
                  </GridViewField>
                  <GridViewField heading='Description' isLoading={isLoading} multiline >
                    {defaultValues?.description}
                  </GridViewField>

                </Grid>

                <Grid container spacing={2} p={1.5}>
                  <GridViewTitle title={t('attachment.attachments.label')} />
                  <Box
                    gap={1}
                    p={1.5}
                    display={'grid'}
                    gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)', lg: 'repeat(6, 1fr)', xl: 'repeat(8, 1fr)' }}
                    sx={{ width: '100%' }}>
                    {slides?.map((file, _index) => (
                      <GalleryItem
                        isLoading={isLoading}
                        key={file?._id}
                        image={file}
                        onOpenLightbox={() => handleOpenLightbox(_index)}
                        onDownloadFile={() => handleDownloadFile(file._id, file?.name, file?.extension)}
                        toolbar
                        size={150}
                      />
                    ))}

                    {defaultValues?.files?.map((file, _index) => {
                      if (!file.fileType.startsWith('image')) {
                        return (
                          <GalleryItem
                            key={file?._id}
                            image={{
                              thumbnail: `data:image/png;base64, ${file.thumbnail}`,
                              src: `data:image/png;base64, ${file.thumbnail}`,
                              downloadFilename: `${file?.name}.${file?.extension}`,
                              name: file?.name,
                              fileType: file?.fileType,
                              extension: file?.extension,
                              isLoaded: false,
                              id: file?._id,
                              width: '100%',
                              height: '100%'
                            }}
                            isLoading={isLoading}
                            onDownloadFile={() => handleDownloadFile(file._id, file?.name, file?.extension)}
                            onOpenFile={() => handleOpenFile(file._id, file?.name, file?.extension)}
                            toolbar
                          />
                        )
                      }
                      return null
                    })}

                  </Box>

                  <Lightbox index={selectedImage} slides={slides} open={selectedImage >= 0} close={handleCloseLightbox} onGetCurrentIndex={index => handleOpenLightbox(index)} disabledSlideshow />
                </Grid>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {PDFViewerDialog && (
          <Dialog fullScreen open={PDFViewerDialog} onClose={() => setPDFViewerDialog(false)}>
            <DialogTitle variant='h3' sx={{ pb: 1, pt: 2, display: 'flex', justifyContent: 'space-between' }}>
              PDF View
              <Button variant='outlined' onClick={() => setPDFViewerDialog(false)}>
                Close
              </Button>
            </DialogTitle>
            <Divider variant='fullWidth' />
            {pdf ? <iframe title={PDFName} src={pdf} style={{ paddingBottom: 10 }} width='100%' height='842px' /> : <SkeletonPDF />}
          </Dialog>
        )}
      </Fragment>
    </>
  )
}


DocumentViewForm.prototype = {
  isDrawingPage: PropTypes.bool
}
export default DocumentViewForm
