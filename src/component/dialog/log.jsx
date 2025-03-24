import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSelector } from 'react-redux'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { useMediaQuery, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Grid } from '@mui/material'
import { SkeletonLoading, CodeRaw } from 'component'
import { styled, useTheme } from '@mui/material/styles'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledCloseButton, GBackdropPropsOption } from 'theme/style'
import { camelCaseNormalizer } from 'util'
import { TYPOGRAPHY, FLEX, KEY, SZ } from 'constant'

const ResponsiveGrid = styled(Grid)(({ theme }) => ({
 [theme.breakpoints.down('sm')]: {
  flexDirection: 'column'
 }
}))

const extraInfo = ['customer', 'machine']

function LogDetailsDialog({ logDetails, open, setOpenLogDetailsDialog, componentTitle }) {
 const [logsToShow, setLogsToShow] = useState({})
 const { isLoading } = useSelector(state => state.log)
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 useEffect(() => {
  if (logDetails) {
   const formattedLog = formatMachineLogToShow(logDetails)
   setLogsToShow(formattedLog)
  }
 }, [logDetails])

 const formatMachineLogToShow = log => {
  const { createdIP, updatedIP, __v, machine, customer, updatedBy, createdBy, archivedByMachine, createdAt, updatedAt, isActive, isArchived, type, version, batchId, ...rest } = log
  return { ...rest }
 }

 const handleCloseDialog = () => {
  setOpenLogDetailsDialog(false)
 }

 const renderDialogContent = () => {
  if (isLoading) {
   return <SkeletonLoading />
  }
  return <LogDetailsRaw logsToShow={logsToShow} logDetails={logDetails} mode={themeMode} />
 }

 return (
  <Dialog disableEnforceFocus maxWidth={SZ.LG} open={open} onClose={handleCloseDialog} BackdropProps={GBackdropPropsOption(themeMode)}>
   <GStyledTopBorderDivider mode={themeMode} />
   <DialogTitle sx={{ pb: 1, pt: 2 }}>
    <GStyledSpanBox
     sx={{
      justifyContent: FLEX.FLEX_START
     }}>
     <Typography variant={isDesktop ? TYPOGRAPHY.H3 : TYPOGRAPHY.H5}>{componentTitle?.date} &nbsp;</Typography>
     <Typography variant={isDesktop ? TYPOGRAPHY.H3 : TYPOGRAPHY.H5} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.bronze}>
      {componentTitle?.componentLabel}
     </Typography>
    </GStyledSpanBox>
   </DialogTitle>
   <Divider orientation={KEY.HORIZONTAL} flexItem sx={{ mb: 2 }} />
   <DialogContent>{renderDialogContent()}</DialogContent>
   <DialogActions>
    <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
     <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCloseDialog}>
      {t('close.label').toUpperCase()}
     </GStyledCloseButton>
    </Grid>
   </DialogActions>
  </Dialog>
 )
}
export default LogDetailsDialog

LogDetailsDialog.propTypes = {
 logDetails: PropTypes.object,
 open: PropTypes.bool,
 onClose: PropTypes.func,
 setOpenLogDetailsDialog: PropTypes.func,
 refreshLogsList: PropTypes.func,
 logType: PropTypes.string,
 isLogsPage: PropTypes.bool,
 componentTitle: PropTypes.object
}

const LogDetailsRaw = ({ logsToShow, logDetails, mode }) => {
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 return (
  <Fragment>
   <CodeRaw value={JSON.stringify(logsToShow, null, 2)} HandleChangeIniJson={() => {}} editable={false} disableTopBar autoHeight />
   <Accordion>
    <AccordionSummary
     aria-controls='panel1-content'
     id='panel1-header'
     expandIcon={<Icon icon={ICON_NAME.CHEVRON_DOWN} color={mode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white} />}
     sx={{ backgroundColor: mode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[700] }}>
     <Typography variant={isDesktop ? TYPOGRAPHY.H5 : TYPOGRAPHY.H6}> {t('see_more.label').toUpperCase()}</Typography>
    </AccordionSummary>
    <AccordionDetails>
     <ResponsiveGrid container spacing={2} sx={{ backgroundColor: 'transparent' }}>
      {extraInfo.map((info, index) => (
       <Grid item xs={12} sm={6} key={index}>
        <Box sx={{ mb: 2 }}>
         <Typography variant={TYPOGRAPHY.BODY2} color={mode === KEY.LIGHT ? theme.palette.grey[700] : theme.palette.common.white} sx={{ fontWeight: 'bold' }}>
          {camelCaseNormalizer(info)}:
         </Typography>
         <Typography variant={TYPOGRAPHY.BODY2} color={mode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white}>
          {JSON.stringify(logDetails[info])?.replaceAll('"', '')}
         </Typography>
        </Box>
       </Grid>
      ))}
     </ResponsiveGrid>
    </AccordionDetails>
   </Accordion>
  </Fragment>
 )
}

LogDetailsRaw.propTypes = {
 logsToShow: PropTypes.object,
 logDetails: PropTypes.object,
 mode: PropTypes.string
}
