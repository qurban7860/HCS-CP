import { Fragment, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { t } from 'i18next'
import _ from 'lodash'
import download from 'downloadjs'
import b64toBlob from 'b64-to-blob'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'auth/use-auth-context'
import { IconFlexi, snack, useResponsive, useSettingContext } from 'hook'
import { dispatch } from 'store'
import { useForm } from 'react-hook-form'
import { getFile, getTicket, getTicketSettings, getSoftwareVersion, deleteFile, resetTicketSettings, resetTicket, resetSoftwareVersion } from 'store/slice'
import { PATH_DASHBOARD, PATH_MACHINE, PATH_SUPPORT } from 'route/path'
import { TicketSchema } from 'schema'
import { TicketComment, useTicketViewDefaultValues } from 'section/support'
import { useTheme, Grid, Box, Dialog, DialogTitle, Divider, Button, Card, TextField } from '@mui/material'
import { AuditBox, GridViewField, GridViewTitle, GalleryItem, Lightbox, SkeletonPDF, BackButton, RHFDescription } from 'component'
import { GStyledStickyFormGrid, GCardOption, GStyledTopBorderDivider } from 'theme/style'
import { REGEX, FLEX_DIR, FLEX } from 'constant'
import { handleError } from 'util'

/**
 * View ticket form
 * @returns {JSX.Element}
 */
function TicketViewForm() {
 const [slides, setSlides] = useState([])
 const [selectedImage, setSelectedImage] = useState(-1)
 const [pdf, setPDF] = useState(null)
 const [PDFName, setPDFName] = useState('')
 const [PDFViewerDialog, setPDFViewerDialog] = useState(false)

 const { customer, isLoading, machine, softwareVersion, ticket, ticketSettings } = useSelector(
  state => ({
   customer: state.customer.customer,
   isLoading: state.ticket.isLoading,
   softwareVersion: state.ticket.softwareVersion,
   ticket: state.ticket.ticket,
   ticketSettings: state.ticket.ticketSettings
  }),
  _.isEqual
 )

 const { id } = useParams()

 const { user, userId } = useAuthContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const navigate = useNavigate()
 const regEx = new RegExp(REGEX.SUCCESS_CODE)
 const isMobile = useResponsive('down', 'sm')
 const fetchCustomerRef = useRef(false)

 const defaultValues = useTicketViewDefaultValues(ticket, customer, softwareVersion)
 const methods = useForm({
  resolver: yupResolver(TicketSchema('new')),
  defaultValues,
  mode: 'onChange',
  reValidateMode: 'onChange'
 })

 useLayoutEffect(() => {
  // dispatch(resetTicket())
  // dispatch(resetTicketSettings())
  // dispatch(resetSoftwareVersion())
 }, [dispatch])

 // useEffect(() => {
 //   dispatch(getTicket(id, customer?._id))
 //  },[dispatch, id, customer?._id])

 useEffect(() => {
  dispatch(getTicketSettings())
 }, [dispatch])

 useEffect(() => {
  if (ticket?.machine?._id) {
   dispatch(getSoftwareVersion(ticket?.machine?._id, customer?._id))
  }
 }, [dispatch, ticket?.machine?._id])

 useEffect(() => {
  const newSlides = ticket?.files
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
 }, [ticket?.files?.length])

 const handleOpenLightbox = async index => {
  setSelectedImage(index)
  const image = slides[index]
  if (!image?.isLoaded && image?.fileType?.startsWith('image')) {
   try {
    const response = await dispatch(getFile(id, image?._id, customer?._id))
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
  dispatch(getFile(id, fileId, customer?._id))
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

 const handleDeleteFile = async fileId => {
  try {
   await dispatch(deleteFile(id, fileId))
   snack(t('responses.success.delete_file'))
  } catch (err) {
   console.log(err)
   snack(t('responses.error.delete_file'), { variant: `error` })
  }
 }

 const handleOpenFile = async (fileId, fileName, fileExtension) => {
  setPDFName(`${fileName}.${fileExtension}`)
  setPDFViewerDialog(true)
  setPDF(null)
  try {
   const response = await dispatch(getFile(id, fileId))
   if (regEx.test(response.status)) {
    const blob = b64toBlob(encodeURI(response.data), 'application/pdf')
    const url = URL.createObjectURL(blob)
    setPDF(url)
   } else {
    snack(response.statusText, { variant: 'error' })
   }
  } catch (error) {
   if (error.message) {
    snack(error.message, { variant: 'error' })
   } else {
    snack(t('responses.error.unexpected_error'), { variant: 'error' })
   }
  }
 }

 const handleBackAction = event => {
  navigate(PATH_SUPPORT.tickets.list)
 }

 return (
  <Fragment>
   <Grid container direction={{ xs: 'column', md: 'row' }} mt={2} flex={1} rowSpacing={4} gridAutoFlow={isMobile ? FLEX_DIR.COLUMN : FLEX_DIR.ROW} columnSpacing={2}>
    {/* <GStyledStickyFormGrid item xs={12} md={3}>
     <Box mt={0} mb={2}>
      <Card {...GCardOption(themeMode)}>
       <GStyledTopBorderDivider mode={themeMode} />
       <Grid container spacing={2} p={1.5}>
        <GridViewField heading={t('machine.label')} isLoading={isLoading} gridSize={12} customerLink={PATH_MACHINE.machines.view(defaultValues?.machineId)}>
         {defaultValues?.machine}
        </GridViewField>
        <GridViewField heading={t('ticket_number.label')} isLoading={isLoading} gridSize={12}>
         {defaultValues?.ticketNo}
        </GridViewField>
        <GridViewField heading={t('request_type.label')} isLoading={isLoading} gridSize={12}>
         {defaultValues?.requestType}
        </GridViewField>
       </Grid>
      </Card>
     </Box>
     <BackButton handleBackAction={handleBackAction} />
    </GStyledStickyFormGrid> */}
    <Grid item xs={12} sm={12} lg={12}>
    <BackButton handleBackAction={handleBackAction} />
    <Box mt={2} mb={5}>
      <Card {...GCardOption(themeMode)}>
       <GStyledTopBorderDivider mode={themeMode} />
       <Grid container spacing={2} p={1.5}>
        <GridViewField heading={t('machine.label')} isLoading={isLoading} gridSize={6} customerLink={PATH_MACHINE.machines.view(defaultValues?.machineId)}>
         {defaultValues?.machine}
        </GridViewField>
        {/* <GridViewField heading={t('ticket_number.label')} isLoading={isLoading} gridSize={6}>
         {defaultValues?.ticketNo}
        </GridViewField> */}
        <GridViewField heading={t('request_type.label')} isLoading={isLoading} gridSize={6}>
         {defaultValues?.requestType}
        </GridViewField>
       </Grid>
      </Card>
     </Box>
    <Box mb={5} mt={0}>
      <Card {...GCardOption(themeMode)}>
       <GStyledTopBorderDivider mode={themeMode} />
         <Grid container spacing={2} p={1.5}>
        <Grid item xs={12} sm={12} md={8}>
         <Grid container spacing={2} p={1.5}>
          <GridViewField heading={t('status.label')} isLoading={isLoading}>
           {defaultValues?.status}
          </GridViewField>
          <GridViewField heading={t('priority.label')} isLoading={isLoading}>
           <IconFlexi icon={defaultValues?.priorityIcon} color={defaultValues?.priorityColor} /> &nbsp;{defaultValues?.priority}
          </GridViewField>
          <GridViewField heading={t('impact.label')} isLoading={isLoading}>
           {defaultValues?.impact}
          </GridViewField>
         </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
         <Grid container spacing={2} p={1.5} display={FLEX.FLEX} justifyContent={FLEX.FLEX_END}>
          <GridViewField heading={t('hmi_version.label')} isLoading={isLoading}>
           {softwareVersion?.hlc}
          </GridViewField>
          <GridViewField heading={t('plc_version.label')} isLoading={isLoading}>
           {softwareVersion?.plc}
          </GridViewField>
         </Grid>
        </Grid>

       </Grid>

       <Grid container spacing={2} p={1.5}>
        <Grid item xs={12} sm={12} md={12}>
         <Grid container spacing={2} p={1.5}>
          <GridViewField heading={t('summary.label')} isLoading={isLoading} gridSize={12}>
           {defaultValues?.summary}
          </GridViewField>
          <Grid item xs={12} sm={12}>
           <TextField
            multiline
            variant={'filled'}
            value={defaultValues?.description}
            fullWidth
            disabled
            sx={{ '&:disabled': { backgroundColor: theme.palette.grey[100], color: theme.palette.common.black } }}
           />
          </Grid>
          {/* <GridViewField heading={t('description.label')} isLoading={isLoading} gridSize={12} multiline>
           {defaultValues?.description}
          </GridViewField> */}
         </Grid>
        </Grid>
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
           onDeleteFile={() => handleDeleteFile(file._id)}
           toolbar
           size={150}
          />
         ))}

         {ticket?.files?.map((file, _index) => {
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
             onDeleteFile={() => handleDeleteFile(file._id)}
             onOpenFile={() => handleOpenFile(file._id, file?.name, file?.extension)}
             toolbar
            />
           )
          }
          return null
         })}
        </Box>

        <Lightbox index={selectedImage} slides={slides} open={selectedImage >= 0} close={handleCloseLightbox} onGetCurrentIndex={index => handleOpenLightbox(index)} disabledSlideshow />

        {defaultValues?.issueType?.name === 'Change Request' && (
         <Fragment>
          <GridViewField heading={t('change_type.label')} isLoading={isLoading}>
           {defaultValues?.changeType}
          </GridViewField>
          <GridViewField heading={t('change_reason.label')} isLoading={isLoading}>
           {defaultValues?.changeReason}
          </GridViewField>
          <GridViewField heading={t('implementation_plan.label')} isLoading={isLoading}>
           {defaultValues?.implementationPlan}
          </GridViewField>
          <GridViewField heading={t('backout_plan.label')} isLoading={isLoading}>
           {defaultValues?.backoutPlan}
          </GridViewField>
          <GridViewField heading={t('test_plan.label')} isLoading={isLoading}>
           {defaultValues?.testPlan}
          </GridViewField>
         </Fragment>
        )}

        {defaultValues?.issueType?.name?.trim()?.toLowerCase() === 'service request' && (
         <Fragment>
          <GridViewField heading={t('investigation_reason.label')} isLoading={isLoading}>
           {defaultValues?.investigationReason}
          </GridViewField>
          <GridViewField heading={t('root_cause.label')} isLoading={isLoading}>
           {defaultValues?.rootCause}
          </GridViewField>
          <GridViewField heading={t('workaround.label')} isLoading={isLoading}>
           {defaultValues?.workaround}
          </GridViewField>
         </Fragment>
        )}

        {defaultValues?.issueType?.name?.trim()?.toLowerCase() === 'change request' && (
         <Grid container sx={{ pb: 3 }}>
          <GridViewField heading={t('planned_start_date.label')} isLoading={isLoading}>
           {defaultValues?.plannedStartDate}
          </GridViewField>
          <GridViewField heading={t('planned_start_time.label')} isLoading={isLoading}>
           {defaultValues?.startTime}
          </GridViewField>
          <GridViewField heading={t('planned_end_date.label')} isLoading={isLoading}>
           {defaultValues?.plannedEndDate}
          </GridViewField>
          <GridViewField heading={t('planned_end_time.label')} isLoading={isLoading}>
           {defaultValues?.endTime}
          </GridViewField>
         </Grid>
        )}
       </Grid>
      </Card>
     </Box>
     <Box mb={5} mt={0}>
      <Card {...GCardOption(themeMode)}>
       <GStyledTopBorderDivider mode={themeMode} />
       <TicketComment currentUser={{ ...user, userId }} />
      </Card>
     </Box>
    </Grid>
   </Grid>
   <AuditBox value={defaultValues} />

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
 )
}

export default TicketViewForm
