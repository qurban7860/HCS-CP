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
    const now = new Date();

    switch (timePeriod) {
      case 'Hourly':
        for (let i = 23; i >= 0; i--) {
          const d = new Date();
          d.setHours(d.getHours() - i);
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const hour = String(d.getHours()).padStart(2, '0');
          labels.push(`${month}/${day} ${hour}`);
        }
        break;

      case 'Daily':
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          labels.push(`${day}/${month}`);
        }
        break;

      case 'Monthly':
        for (let i = 11; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i);
          const shortMonth = d.toLocaleString('default', { month: 'short' });
          const yearShort = String(d.getFullYear()).slice(-2);
          labels.push(`${shortMonth} ${yearShort}`);
        }
        break;

      case 'Quarterly':
        for (let i = 3; i >= 0; i--) {
          const d = new Date();
          d.setMonth(d.getMonth() - i * 3);
          const year = d.getFullYear();
          const quarter = Math.floor(d.getMonth() / 3) + 1;
          labels.push(`${year}-Q${quarter}`);
        }
        break;

      case 'Yearly':
        for (let i = 4; i >= 0; i--) {
          labels.push(String(now.getFullYear() - i));
        }
        break;

      default:
        return null;
    }

    const producedLength = labels.map(label => dataMap.get(label)?.componentLength || 0);
    const wasteLength = labels.map(label => dataMap.get(label)?.waste || 0);

    return {
      categories: labels,
      series: [
        { name: 'Produced Length (m)', data: producedLength },
        { name: 'Waste Length (m)', data: wasteLength }
      ]
    };
  };



  const chartData = processGraphData()

  return (
    <Grid item xs={12} sm={12} md={12} xl={isDashboard ? 12 : 12}>
      <GStyledSpanBox alignItems={KEY.CENTER} my={2} sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
        {isDesktop && (
          <Typography variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.OVERLINE} gutterBottom>
            {t('production.production_total.label').toUpperCase()}
          </Typography>
        )}
        {/* &nbsp; */}
        {/* <Box>
          <Typography variant={isDashboard ? TYPOGRAPHY.OVERLINE0 : TYPOGRAPHY.H4} p={0}>
            {getTimePeriodDesc(timePeriod).toUpperCase()}
          </Typography>
        </Box> */}
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
