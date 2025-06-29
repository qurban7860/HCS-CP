import PropTypes from 'prop-types'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography, useMediaQuery } from '@mui/material'
import { t } from 'i18next'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'

import { getLogTypeConfigForGenerationAndType } from 'config/log-types'
import { FLEX, KEY, TYPOGRAPHY } from 'constant'
import { useSettingContext, snack, ICON_NAME, Icon } from 'hook'
import { dispatch } from 'store'
import { getLogs } from 'store/slice'
import { convertValue } from 'util/convertUnits';
import { GStyledCloseButton, GStyledSpanBox, GStyledTopBorderDivider } from 'theme/style'
import { IconTooltip } from 'component'

function DownloadMachineLogsIconButton({ dataForApi, unit }) {
  const [openLogsDownloadDialog, setOpenLogsDownloadDialog] = useState(false)
  const [dataForDownload, setDataForDownload] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const defaultLogHeaders = getLogTypeConfigForGenerationAndType(5, 'ERP').formats['v1.5.X'];
  const tableColumns = getLogTypeConfigForGenerationAndType(5, 'ERP').tableColumns;

  const { themeMode } = useSettingContext()
  const theme = useTheme()

  const openDownloadDialog = async () => {
    setIsLoading(true)
    try {
      const logsData = await dispatch(
        getLogs({
          ...dataForApi,
          page: undefined,
          pageSize: undefined,
          returnResponse: true
        })
      )
      if (logsData?.length > 0) {
        setOpenLogsDownloadDialog(true)
        setDataForDownload(logsData)
      } else {
        snack('No logs data available for download with the selected filters', {
          variant: `error`
        })
      }
    } catch (error) {
      console.error('Error fetching log data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const handleCloseDialog = () => {
    setOpenLogsDownloadDialog(false)
  }

  const handleDownload = format => {
    if (!Array.isArray(dataForDownload) || dataForDownload.length === 0) return

    const headers = ['logId', ...defaultLogHeaders]
    let blob
    let filename

    if (format === 'csv') {
      const csvRows = [headers.join(',')]

      dataForDownload.forEach(row => {
        const values = headers.map(header => {
          let value = ''
          if (row[header]) {
            value = row[header]
          }
          let columnVal = tableColumns?.find(c => c?.id === header);
          if (columnVal?.unit && !isNaN(parseFloat(value))) {
            const converted = convertValue(
              parseFloat(value),
              columnVal?.unit,
              unit,
              false
            );
            value = converted.convertedValue;
          }
          if (header === 'timestamp') value = row.timestamp || row.date
          if (header === 'measurementUnit') value = unit === 'Imperial' ? 'in' : 'mm';
          if (header === 'logId') value = row._id
          const escaped = String(value).replace(/"/g, '""')
          return escaped
        })
        csvRows.push(values.join(','))
      })

      const csvString = csvRows.join('\n')
      blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      filename = 'csv_logs.csv'
    } else if (format === 'json') {
      const jsonArray = dataForDownload.map(row => {
        const jsonObj = {}
        headers.forEach(header => {
          let value = ''
          if (row[header]) {
            value = row[header]
          }
          let columnVal = tableColumns?.find(c => c?.id === header);
          if (columnVal?.unit && !isNaN(parseFloat(value))) {
            const converted = convertValue(
              parseFloat(value),
              columnVal?.unit,
              unit,
              false
            );
            value = converted.convertedValue;
          }
          if (header === 'timestamp') value = unit === 'Imperial' ? 'in' : 'mm';
          if (header === 'measurementUnit') value = 'mm'
          if (header === 'logId') value = row._id
          jsonObj[header] = value
        })
        return jsonObj
      })

      const jsonString = JSON.stringify(jsonArray, null, 2)
      blob = new Blob([jsonString], { type: 'application/json' })
      filename = 'json_logs.json'
    }

    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setOpenLogsDownloadDialog(false)
  }

  const handleDownloadCSV = () => handleDownload('csv')
  const handleDownloadJSON = () => handleDownload('json')

  return (
    <>
      <IconTooltip
        title='Download Logs'
        icon={ICON_NAME.TRAY_DOWNLOAD}
        color={theme.palette.common.white}
        tooltipColor={theme.palette.primary.main}
        buttonColor={theme.palette.howick.darkBlue}
        onClick={openDownloadDialog}
        variant='contained'
        size='small'
        disabled={isLoading}
      />
      <Dialog open={openLogsDownloadDialog} onClose={handleCloseDialog}>
        <GStyledTopBorderDivider mode={themeMode} />
        <DialogTitle sx={{ pb: 1, pt: 2 }}>
          <GStyledSpanBox
            sx={{
              justifyContent: FLEX.FLEX_START
            }}>
            <Typography variant={TYPOGRAPHY.H5}>{'Download Format'.toUpperCase()}</Typography>
          </GStyledSpanBox>
        </DialogTitle>
        <Divider orientation={KEY.HORIZONTAL} flexItem sx={{ mb: 2 }} />
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant='outlined'
              size='large'
              onClick={handleDownloadCSV}
              sx={{
                width: '150px',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
              <Icon icon={ICON_NAME.CSV_FILE_DELIMITED} width={40} height={40} />
              {/* <Iconify icon="mdi:file-delimited" width={40} height={40} /> */}
              CSV Format
            </Button>
            <Button
              variant='outlined'
              size='large'
              onClick={handleDownloadJSON}
              sx={{
                width: '150px',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}>
              <Icon icon={ICON_NAME.JSON_CODE} width={40} height={40} />
              {/* <Iconify icon="mdi:code-json" width={40} height={40} /> */}
              JSON Format
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent={FLEX.FLEX_END} gap={2}>
            <GStyledCloseButton icon={ICON_NAME.CHEVRON_RIGHT} onClick={handleCloseDialog}>
              {t('close.label').toUpperCase()}
            </GStyledCloseButton>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default DownloadMachineLogsIconButton

DownloadMachineLogsIconButton.propTypes = {
  dataForApi: PropTypes.object,
  unit: PropTypes.string
}
