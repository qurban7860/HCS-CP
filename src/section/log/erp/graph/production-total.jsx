/* eslint-disable no-case-declarations */
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

const ERPProductionTotal = ({ timePeriod, customer, graphLabels, logsGraphData, isDashboard, graphHeight = 500, dateFrom, dateTo }) => {
  const [graphData, setGraphData] = useState([])
  const { isLoading } = useSelector(state => state.log)
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  //  useEffect(() => {
  //   if (!isDashboard) dispatch(resetLogsGraphData())
  //  }, [])

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
    if (!graphData || graphData.length === 0) return null;

    const dataMap = new Map();
    graphData.forEach(item => dataMap.set(item._id, item));

    const labels = [];
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);

    if (timePeriod === 'Hourly') {
      const currentDate = new Date(startDate)
      currentDate.setHours(0, 0, 0, 0)
      
      const finalDate = new Date(endDate)
      finalDate.setHours(23, 59, 59, 999)

      const labelsSet = new Set()
      let hourCount = 0

      while (currentDate <= finalDate && hourCount < 24) {
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const day = String(currentDate.getDate()).padStart(2, '0')
        const hour = String(currentDate.getHours()).padStart(2, '0')

        const label = `${month}/${day} ${hour}`
        if (!labelsSet.has(label)) {
          labels.push(label)
          labelsSet.add(label)
        }

        currentDate.setHours(currentDate.getHours() + 1)
        hourCount++
      }
    } else if (timePeriod === 'Daily') {
      let currentDate = new Date(startDate)
      let dayCount = 0
      while (currentDate <= endDate && dayCount < 30) {
        const day = String(currentDate.getDate()).padStart(2, '0')
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        labels.push(`${day}/${month}`)
        currentDate.setDate(currentDate.getDate() + 1)
        dayCount++
      }
    } else if (timePeriod === 'Monthly') {
      let currentMonth = new Date(startDate)
      let monthCount = 0
      while (currentMonth <= endDate && monthCount < 12) {
        const shortMonth = currentMonth.toLocaleString('default', { month: 'short' })
        const yearShort = String(currentMonth.getFullYear()).slice(-2)
        labels.push(`${shortMonth} ${yearShort}`)
        currentMonth.setMonth(currentMonth.getMonth() + 1)
        monthCount++
      }
    } else if (timePeriod === 'Quarterly') {
      let currentQDate = new Date(startDate)
      let quarterCount = 0
      while (currentQDate <= endDate && quarterCount < 4) {
        const year = currentQDate.getFullYear()
        const quarter = Math.floor(currentQDate.getMonth() / 3) + 1
        labels.push(`${year}-Q${quarter}`)
        currentQDate.setMonth(currentQDate.getMonth() + 3)
        quarterCount++
      }
    } else if (timePeriod === 'Yearly') {
      let currentYDate = new Date(startDate)
      let yearCount = 0
      while (currentYDate <= endDate && yearCount < 5) {
        labels.push(String(currentYDate.getFullYear()))
        currentYDate.setFullYear(currentYDate.getFullYear() + 1)
        yearCount++
      }
    } else {
      return null
    }

    const producedLength = labels.map(label => dataMap.get(label)?.componentLength || 0)
    const wasteLength = labels.map(label => dataMap.get(label)?.waste || 0)

    return {
      categories: labels,
      series: [
        { name: 'Produced Length (m)', data: producedLength },
        { name: 'Waste Length (m)', data: wasteLength }
      ]
    }
  }

  const chartData = processGraphData()

  return (
    <Grid item xs={12} sm={12} md={12} xl={isDashboard ? 12 : 12}>
      <GStyledSpanBox alignItems={KEY.CENTER} my={2} sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
        {isDesktop && (
          <Typography variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.OVERLINE} gutterBottom>
            {t('production.label').toUpperCase()}
          </Typography>
        )}
        {/* &nbsp; */}
        {/* <Box>
          <Typography variant={isDashboard ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.H4} p={0}>
            {getTimePeriodDesc(timePeriod).toUpperCase()}
          </Typography>
        </Box> */}
      </GStyledSpanBox>
      <Card
        sx={{ p: 3, background: themeMode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[800], color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white }}>
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
                {customer?._id ? 'No data available' : 'Please Select a customer to view the graph.'}
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
  graphHeight: PropTypes.number,
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date)
}

export default ERPProductionTotal
