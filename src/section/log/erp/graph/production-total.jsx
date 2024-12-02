import PropTypes from 'prop-types'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import { dispatch } from 'store'
import { useSettingContext } from 'hook'
import { resetLogsGraphData } from 'store/slice'
import { useMediaQuery, Typography, Card, Grid, Box } from '@mui/material'
import { LogStackedChart, HowickLoader } from 'component'
import { useTheme } from '@mui/material/styles'
import { getTimePeriodDesc } from 'section/log'
import { GStyledSpanBox, GStyledCenterBox } from 'theme/style'
import { TYPOGRAPHY, KEY, FLEX } from 'constant'

const ERPProductionTotal = ({ timePeriod, customer, graphLabels, logsGraphData, isDashboard, graphHeight = 500 }) => {
 const [graphData, setGraphData] = useState([])
 const { isLoading } = useSelector(state => state.log)

 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

 useEffect(() => {
  if (!isDashboard) dispatch(resetLogsGraphData())
 }, [dispatch])

 useEffect(() => {
  if (logsGraphData) {
   const convertedDataToMeters = logsGraphData.map(item => ({
    ...item,
    componentLength: item.componentLength / 1000,
    waste: item.waste / 1000
   }))
   setGraphData(convertedDataToMeters)
  }
 }, [logsGraphData])

 const processGraphData = () => {
  if (!graphData || graphData.length === 0) {
   return null
  }
  const sortedData = [...graphData].sort((a, b) => a._id.localeCompare(b._id))
  let labels = []

  switch (timePeriod) {
   case 'Daily':
    sortedData.sort((a, b) => new Date(a._id) - new Date(b._id))
    labels = Array.from({ length: 7 }, (_, i) => {
     const date = new Date()
     date.setDate(date.getDate() - i)
     const month = String(date.getMonth() + 1).padStart(2, '0')
     const day = String(date.getDate()).padStart(2, '0')
     return `${month}/${day}`
    }).reverse()
    break
   case 'Monthly':
    sortedData.sort((a, b) => {
     const [yearA, monthA] = a._id.split('-')
     const [yearB, monthB] = b._id.split('-')
     return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1)
    })
    labels = Array.from({ length: 12 }, (_, i) => {
     const date = new Date()
     date.setMonth(date.getMonth() - i)
     const year = date.getFullYear()
     const month = String(date.getMonth() + 1).padStart(2, '0')
     return `${year}-${month}`
    }).reverse()
    break
   case 'Quarterly':
    sortedData.sort((a, b) => {
     const [yearA, qtrA] = a._id.split('-')
     const [yearB, qtrB] = b._id.split('-')
     return yearA === yearB ? qtrA.localeCompare(qtrB) : yearA.localeCompare(yearB)
    })
    labels = Array.from({ length: 4 }, (_, i) => {
     const date = new Date()
     date.setMonth(date.getMonth() - i * 3)
     const year = date.getFullYear()
     const quarter = Math.floor(date.getMonth() / 3) + 1
     return `${year}-Q${quarter}`
    }).reverse()
    break
   case 'Yearly':
    sortedData.sort((a, b) => a._id.localeCompare(b._id))
    labels = Array.from({ length: 5 }, (_, i) => {
     const date = new Date()
     date.setFullYear(date.getFullYear() - i)
     return date.getFullYear().toString()
    }).reverse()
    break
   default:
    labels = sortedData.map(item => item._id)
  }

  const producedLength = labels.map(label => {
   const dataPoint = sortedData.find(item => item._id.includes(label))
   return dataPoint ? dataPoint.componentLength : 0
  })

  const wasteLength = labels.map(label => {
   const dataPoint = sortedData.find(item => item._id.includes(label))
   return dataPoint ? dataPoint.waste : 0
  })

  const filteredIndices = producedLength.reduce((acc, prod, index) => {
   if (prod !== 0 || wasteLength[index] !== 0) {
    acc.push(index)
   }
   return acc
  }, [])

  const filteredLabels = filteredIndices.map(i => labels[i])
  const filteredProduced = filteredIndices.map(i => producedLength[i])
  const filteredWaste = filteredIndices.map(i => wasteLength[i])

  return {
   categories: filteredLabels,
   series: [
    { name: 'Produced Length (m)', data: filteredProduced },
    { name: 'Waste Length (m)', data: filteredWaste }
   ]
  }
 }

 const chartData = processGraphData()

 return (
  <Grid item xs={12} sm={12} md={12} xl={isDashboard ? 12 : 6} sx={{ mt: 3 }}>
   <GStyledSpanBox alignItems={KEY.CENTER} my={2} sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
    {isDesktop && (
     <Typography variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.OVERLINE} gutterBottom>
      {t('production.production_total.label').toUpperCase()}
     </Typography>
    )}
    &nbsp;
    <Box>
     <Typography variant={isDashboard ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.H4} p={0}>
      {getTimePeriodDesc(timePeriod).toUpperCase()}
     </Typography>
    </Box>
   </GStyledSpanBox>
   <Card sx={{ p: 3, background: themeMode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[800], color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white }}>
    {isLoading && (
     <Fragment>
      <GStyledCenterBox height={graphHeight}>
       <HowickLoader height={300} width={303} mode={themeMode} />
      </GStyledCenterBox>
     </Fragment>
    )}
    {!isLoading && (
     <Fragment>
      {graphData?.length > 0 && <Fragment>{chartData && <LogStackedChart chart={chartData} graphLabels={graphLabels} graphHeight={graphHeight} />}</Fragment>}
      {graphData?.length === 0 && (
       <Typography variant={TYPOGRAPHY.BODY1} color='textSecondary'>
        {customer?._id ? `No data available for the ${getTimePeriodDesc(timePeriod)}.` : 'Please Select a customer to view the graph.'}
       </Typography>
      )}
     </Fragment>
    )}
   </Card>
  </Grid>
 )
}

ERPProductionTotal.propTypes = {
 logsGraphData: PropTypes.array,
 timePeriod: PropTypes.string,
 customer: PropTypes.object,
 graphLabels: PropTypes.object,
 isDashboard: PropTypes.bool,
 graphHeight: PropTypes.number
}

export default ERPProductionTotal
