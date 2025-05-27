import PropTypes from 'prop-types'
import { useState, useEffect, Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { useMediaQuery, Typography, Card, Grid, Box } from '@mui/material'
import { LogLineChart, HowickLoader } from 'component'
import { useTheme } from '@mui/material/styles'
import { getTimePeriodDesc } from 'section/log'
import { GStyledSpanBox, GStyledCenterBox } from 'theme/style'
import { TYPOGRAPHY, KEY, FLEX } from 'constant'
import { TableNoData } from 'component'

const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toFixed(1);
};

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

   const processGraphData = useMemo(() => {
      if (!graphData || graphData.length === 0) {
        return null;
      }
  
      const sortedGraphData = [...graphData].sort((a, b) => {
        let dateA; let dateB;
        if (timePeriod === 'Hourly') {
          const [monthDayA, hourA] = a._id.split(' ');
          const [monthA, dayA] = monthDayA.split('/');
          const [monthDayB, hourB] = b._id.split(' ');
          const [monthB, dayB] = monthDayB.split('/');
          dateA = new Date(`${new Date().getFullYear()}-${monthA}-${dayA}T${hourA}:00:00`);
          dateB = new Date(`${new Date().getFullYear()}-${monthB}-${dayB}T${hourB}:00:00`);
        } else if (timePeriod === 'Daily') {
          const [dayA, monthA] = a._id.split('/');
          const [dayB, monthB] = b._id.split('/');
          dateA = new Date(`${new Date().getFullYear()}-${monthA}-${dayA}`);
          dateB = new Date(`${new Date().getFullYear()}-${monthB}-${dayB}`);
        } else if (timePeriod === 'Monthly') {
          dateA = new Date(a._id.replace(/(\w+)\s(\d+)/, (_, m, y) => `${m} 1, 20${y}`));
          dateB = new Date(b._id.replace(/(\w+)\s(\d+)/, (_, m, y) => `${m} 1, 20${y}`));
        } else if (timePeriod === 'Quarterly') {
          const [yearA, quarterStrA] = a._id.split('-Q');
          const monthA = (parseInt(quarterStrA, 10) - 1) * 3;
          dateA = new Date(parseInt(yearA, 10), monthA);
  
          const [yearB, quarterStrB] = b._id.split('-Q');
          const monthB = (parseInt(quarterStrB, 10) - 1) * 3;
          dateB = new Date(parseInt(yearB, 10), monthB);
        } else if (timePeriod === 'Yearly') {
          dateA = new Date(parseInt(a._id, 10), 0);
          dateB = new Date(parseInt(b._id, 10), 0);
        }
        return dateA - dateB;
      });
  
  
      let limitedData = sortedGraphData;
      let limit = 0;
  
      switch (timePeriod) {
        case 'Hourly':
          limit = 24; 
          break;
        case 'Daily':
          limit = 30; 
          break;
        case 'Monthly':
          limit = 12; 
          break;
        case 'Quarterly':
          limit = 4; 
          break;
        case 'Yearly':
          limit = 5; 
          break;
        default:
          limit = graphData.length; 
      }
  
      if (limitedData.length > limit) {
        limitedData = limitedData.slice(-limit);
      }
  
      const labels = limitedData.map(item => item._id);
      const productionRate = limitedData.map(item => item.productionRate);
  
      return {
        categories: labels,
        series: [
          {
            label: 'Production Rate (m/hr)',
            data: productionRate.map(rate => parseFloat(formatNumber(rate))),
            tension: 0.1
          }
        ]
      };
    }, [graphData, timePeriod]); 
  
    const isNotFound = !isLoading && !graphData.length;

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
            {processGraphData && processGraphData.categories.length > 0 ? (
              <LogLineChart chart={processGraphData} graphLabels={graphLabels} graphHeight={graphHeight} />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }} >
                <TableNoData graphNotFound={isNotFound} />
              </Box>
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
