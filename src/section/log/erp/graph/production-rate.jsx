import PropTypes from 'prop-types'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { useMediaQuery, Typography, Card, Grid, Box } from '@mui/material'
import { LogLineChart, HowickLoader } from 'component'
import { useTheme } from '@mui/material/styles'
import { getTimePeriodDesc } from 'section/log'
import { GStyledSpanBox, GStyledCenterBox } from 'theme/style'
import { TYPOGRAPHY, KEY, FLEX } from 'constant'

const ERPProductionRate = ({ timePeriod, customer, graphLabels, logsGraphData, isDashboard, graphHeight = 500, dateFrom, dateTo }) => {
  const [graphData, setGraphData] = useState([])
  const { isLoading } = useSelector(state => state.log)
  const { isLoading: isLoadingMachineLog } = useSelector(state => state.machineLog)

  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
  if (logsGraphData) {
    const convertedData = logsGraphData.map(item => ({
      ...item,
      productionRate: (item.componentLength / 1000 + item.waste / 1000) / (item.time / 3600000),
      _id: timePeriod === 'Monthly' ? item._id.replace(/^Sep /, 'Sept ') : item._id,
    }))
    setGraphData(convertedData)
  }
  }, [logsGraphData, dateFrom, dateTo, timePeriod])

  const processGraphData = () => {
    if (!graphData || graphData.length === 0) {
      return null
    }

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

      while (currentDate <= finalDate && hourCount <= 24) {
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
      const currentDate = new Date(startDate);
      let dayCount = 0;
      while (currentDate <= endDate && dayCount <= 30) {
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        labels.push(`${day}/${month}`);
        currentDate.setDate(currentDate.getDate() + 1);
        dayCount++;
      }
    } else if (timePeriod === 'Monthly') {
      let currentDate = new Date(startDate);
      let monthCount = 0;
      while (currentDate <= endDate && monthCount <= 12) {
        const shortMonth = currentDate.toLocaleString('default', { month: 'short' });
        const yearShort = String(currentDate.getFullYear()).slice(-2);
        labels.push(`${shortMonth} ${yearShort}`);
        currentDate.setMonth(currentDate.getMonth() + 1);
        monthCount++;
      }
    } else if (timePeriod === 'Quarterly') {
      let currentDate = new Date(startDate);
      let quarterCount = 0;
      while (currentDate <= endDate && quarterCount <= 4) {
        const year = currentDate.getFullYear();
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
        labels.push(`${year}-Q${quarter}`);
        currentDate.setMonth(currentDate.getMonth() + 3);
        quarterCount++;
      }
    } else if (timePeriod === 'Yearly') {
      let currentDate = new Date(startDate);
      let yearCount = 0;
      while (currentDate <= endDate && yearCount <= 5) {
        labels.push(String(currentDate.getFullYear()));
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        yearCount++;
      }
    } else {
      return null;
    }

    const productionRate = labels.map(label => {
      let foundRate = 0;
      for (const value of dataMap.values()) {
        if (value._id.includes(label)) {
          foundRate = value.productionRate;
          break; 
        }
      }
      return foundRate;
    });

    return {
      categories: labels,
      series: [
        {
          label: 'Production Rate (m/hr)',
          data: productionRate,
          tension: 0.1
        }
      ]
    };
  };

  const chartData = processGraphData()

  return (
    <Grid item xs={12} sm={12} md={12} xl={isDashboard ? 12 : 12}>
      <GStyledSpanBox alignItems={'center'} my={2} sx={{ display: 'flex', justifyContent: FLEX.SPACE_BETWEEN }}>
        {isDesktop && (
          <Typography variant={TYPOGRAPHY.H4} gutterBottom>
            {t('production.production_rate.label').toUpperCase()}
          </Typography>
        )}
         {/* &nbsp;
        <Box>
          <Typography variant={isDashboard ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.H4} p={0}>
            {getTimePeriodDesc(timePeriod).toUpperCase()}
          </Typography>
        </Box> */}
      </GStyledSpanBox>
      <Card sx={{ p: 3, background: themeMode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[800], color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.common.white }}>
        {(isLoading || isLoadingMachineLog) && (
          <Fragment>
            <GStyledCenterBox height={graphHeight}>
              <HowickLoader height={300} width={303} mode={themeMode} />
            </GStyledCenterBox>
          </Fragment>
        )}
        {!(isLoading || isLoadingMachineLog) && (
          <Fragment>
            {chartData && chartData.categories.length > 0 ? (
              <LogLineChart chart={chartData} graphLabels={graphLabels} graphHeight={graphHeight} />
            ) : (
              <Typography variant='body1' color='textSecondary'>
                {customer?._id ? 'No data available' : 'Please Select a customer to view the graph.'}
              </Typography>
            )}
          </Fragment>
        )}
      </Card>
    </Grid>
  )
}

ERPProductionRate.propTypes = {
  timePeriod: PropTypes.string,
  customer: PropTypes.object,
  graphLabels: PropTypes.object,
  logsGraphData: PropTypes.array,
  isDashboard: PropTypes.bool,
  graphHeight: PropTypes.number,
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date),
}

export default ERPProductionRate
