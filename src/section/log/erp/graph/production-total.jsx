/* eslint-disable no-case-declarations */
import PropTypes from 'prop-types'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import { dispatch } from 'store'
import { useSettingContext } from 'hook'
import { resetLogsGraphData } from 'store/slice'
import { PATH_LOGS, PATH_MACHINE } from 'route/path';
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery, Typography, Card, Grid, Box } from '@mui/material'
import { LogStackedChart, HowickLoader } from 'component'
import { useTheme } from '@mui/material/styles'
import { getTimePeriodDesc } from 'section/log'
import { GStyledSpanBox, GStyledCenterBox } from 'theme/style'
import { TYPOGRAPHY, KEY, FLEX } from 'constant'
import { TableNoData } from 'component'

const ERPProductionTotal = ({ timePeriod, customer, graphLabels, logsGraphData, isDashboard, graphHeight = 500, dateFrom, dateTo }) => {
  const [graphData, setGraphData] = useState([])
  const { isLoading } = useSelector(state => state.log)
  const { themeMode } = useSettingContext()
  const { machineId } = useParams()
  const navigate = useNavigate();
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
        waste: item.waste / 1000,
        _id: timePeriod === 'Monthly' ? item._id.replace(/^Sep /, 'Sept ') : item._id,
      }))
      setGraphData(convertedDataToMeters)
    }
  }, [logsGraphData, timePeriod])

  const parseHourlyDate = (id, baseYear) => {
    try {
      const [monthDay, hourStr] = id.split(' ');
      if (!monthDay || !hourStr) return null;

      const [month, day] = monthDay.split('/');
      if (!month || !day) return null;

      const hour = parseInt(hourStr, 10);
      if (Number.isNaN(hour)) return null;

      return new Date(`${baseYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.toString().padStart(2, '0')}:00:00`);
    } catch (error) {
      return null;
    }
  };

  const getEarliestDateFromGraphData = () => {
    if (graphData.length === 0) return new Date(dateFrom); 

    let minDate = new Date(dateTo); 

    graphData.forEach((item) => {
      let itemDate;
      if (timePeriod === 'Hourly') {
        itemDate = parseHourlyDate(item._id, dateFrom.getFullYear());
      } else if (timePeriod === 'Daily') {
        const [day, month] = item._id.split('/');
        itemDate = new Date(`${dateFrom.getFullYear()}-${month}-${day}`);
      } else if (timePeriod === 'Monthly') {
        itemDate = new Date(item._id.replace(/(\w+)\s(\d+)/, (_, m, y) => `${m} 1, 20${y}`));
      } else if (timePeriod === 'Quarterly') {
        const [year, quarterStr] = item._id.split('-Q');
        const month = (parseInt(quarterStr, 10) - 1) * 3;
        itemDate = new Date(parseInt(year, 10), month);
      } else if (timePeriod === 'Yearly') {
        itemDate = new Date(parseInt(item._id, 10), 0);
      } else {
        itemDate = new Date(dateFrom);
      }
      if (itemDate && !Number.isNaN(itemDate) && itemDate < minDate) {
        minDate = itemDate;
      }
    });

    return minDate;
  };

  const processGraphData = (skipZeroValues) => {
    if (!graphData || graphData.length === 0) return null;

    const dataMap = new Map();
    graphData.forEach((item) => dataMap.set(item._id, item));

    const labels = [];
    let startDate = new Date(dateFrom);
    const effectiveEndDate = new Date(dateTo);

    if (!skipZeroValues && graphData.length > 0) {
      startDate = getEarliestDateFromGraphData();
    }

    const addLabel = (label) => {
      if (!labels.includes(label)) labels.push(label);
    };

    if (timePeriod === 'Hourly') {
      const current = new Date(startDate);
      effectiveEndDate.setHours(23, 59, 59, 999);
      let count = 0;
      while (current <= effectiveEndDate && count < 24) {
        const label = `${(current.getMonth() + 1).toString().padStart(2, '0')}/${current.getDate().toString().padStart(2, '0')} ${current.getHours().toString().padStart(2, '0')}`;
        if (dataMap.has(label) || !skipZeroValues) {
          addLabel(label);
          count += 1;
        }
        current.setHours(current.getHours() + 1);
      }
    } else if (timePeriod === 'Daily') {
      const current = new Date(startDate);
      let count = 0;
      while (current <= effectiveEndDate && count < 30) {
        const label = `${current.getDate().toString().padStart(2, '0')}/${(current.getMonth() + 1).toString().padStart(2, '0')}`;
        if (dataMap.has(label) || !skipZeroValues) {
          addLabel(label);
          count += 1;
        }
        current.setDate(current.getDate() + 1);
      }
    } else if (timePeriod === 'Monthly') {
      const current = new Date(startDate);
      let count = 0;
      while (current <= effectiveEndDate && count < 12) {
        const label = `${current.toLocaleString('default', { month: 'short' })} ${String(current.getFullYear()).slice(-2)}`;
        if (dataMap.has(label) || !skipZeroValues) {
          addLabel(label);
          count += 1;
        }
        current.setMonth(current.getMonth() + 1);
      }
    } else if (timePeriod === 'Quarterly') {
      const current = new Date(startDate);
      let count = 0;
      while (current <= effectiveEndDate && count < 4) {
        const year = current.getFullYear();
        const quarter = Math.floor(current.getMonth() / 3) + 1;
        const label = `${year}-Q${quarter}`;
        if (dataMap.has(label) || !skipZeroValues) {
          addLabel(label);
          count += 1;
        }
        current.setMonth(current.getMonth() + 3);
      }
    } else if (timePeriod === 'Yearly') {
      const current = new Date(startDate);
      let count = 0;
      while (current <= effectiveEndDate && count < 5) {
        const label = String(current.getFullYear());
        if (dataMap.has(label) || !skipZeroValues) {
          addLabel(label);
          count += 1;
        }
        current.setFullYear(current.getFullYear() + 1);
      }
    } else {
      return null;
    }

    const producedLength = labels.map((label) => dataMap.get(label)?.componentLength || 0);
    const wasteLength = labels.map((label) => dataMap.get(label)?.waste || 0);

    return {
      categories: labels,
      series: [
        { name: 'Produced Length (m)', data: producedLength },
        { name: 'Waste Length (m)', data: wasteLength },
      ],
    };
  };

  const isNotFound = !isLoading && !graphData.length;
  
  const handleExpandGraph = async () => {
  const graphData = processGraphData(false);

  if (machineId) {
    navigate(PATH_MACHINE.machines.fullScreen.view(machineId), {
      state: { graphData, graphLabels, graphHeight }
    });
  } else {
    navigate(PATH_LOGS.fullScreen, {
      state: { graphData, graphLabels, graphHeight }
    });
  }
  };

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
            {graphData?.length > 0 && <Fragment>{processGraphData && <LogStackedChart processGraphData={processGraphData} graphLabels={graphLabels} graphHeight={graphHeight} onExpand={handleExpandGraph} />}</Fragment>}
            {graphData?.length === 0 && (
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
