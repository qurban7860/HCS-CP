/* eslint-disable no-case-declarations */
import PropTypes from 'prop-types'
import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useSettingContext } from 'hook'
import { PATH_LOGS, PATH_MACHINE } from 'route/path';
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Card, Grid, Box } from '@mui/material'
import { LogStackedChart, HowickLoader } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox, GStyledCenterBox } from 'theme/style'
import { KEY, FLEX } from 'constant'
import { TableNoData } from 'component'
import { processGraphData } from './utils/utils'

const ERPProductionTotal = ({ timePeriod, graphLabels, logsGraphData, isDashboard, graphHeight = 500, dateFrom, dateTo, machineSerialNo, unitType = 'Metric' }) => {
  const [graphData, setGraphData] = useState([])
  const { isLoading } = useSelector(state => state.log)
  const { themeMode } = useSettingContext()
  const { machineId } = useParams()
  const navigate = useNavigate();
  const theme = useTheme()

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

  const isNotFound = !isLoading && !graphData.length;

  const getTotalProduction = () => {
    if (!graphData || graphData.length === 0) return '0'
    const totalProduced = graphData.reduce((sum, item) => sum + (item.componentLength || 0) + (item.waste || 0), 0)
    const toDisplay = unitConvertedValues(totalProduced, unitType).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    })
    return `${toDisplay} (${unitType === 'Imperial' ? 'in' : 'm'})`
  }

  const handleExpandGraph = () => {
    if (machineId) {
      navigate(PATH_MACHINE.machines.fullScreen.view(machineId), {
        state: {
          logsGraphData: logsGraphData, graphLabels, timePeriod, dateFrom, dateTo, unitType, producedData, machineSerialNo
        }
      });
    } else {
      navigate(PATH_LOGS.fullScreen, {
        state: {
          logsGraphData: logsGraphData, graphLabels, timePeriod, dateFrom, dateTo, unitType, producedData, machineSerialNo
        }
      });
    }
  };
  
  const producedData = `Meterage Production: ${getTotalProduction()} for Period (${dateFrom.toLocaleDateString('en-GB')} – ${dateTo.toLocaleDateString('en-GB')})`;

  const getGraphTitle = () => {
    let titlePrefix = '';
    switch (timePeriod) {
      case 'Hourly':
        titlePrefix = 'Hourly Production Graph';
        break;
      case 'Daily':
        titlePrefix = 'Daily Production Graph';
        break;
      case 'Monthly':
        titlePrefix = 'Monthly Production Graph';
        break;
      case 'Quarterly':
        titlePrefix = 'Quarterly Production Graph';
        break;
      case 'Yearly':
        titlePrefix = 'Yearly Production Graph';
        break;
      default:
        titlePrefix = 'Production Graph';
    }
    return `${titlePrefix} for Machine ${machineSerialNo || ''}`;
  };

  return (
    <Grid item xs={12} sm={12} md={12} xl={isDashboard ? 12 : 12}>
      <GStyledSpanBox alignItems={KEY.CENTER} my={2} sx={{ display: FLEX.FLEX, justifyContent: FLEX.SPACE_BETWEEN }}>
        {/* {isDesktop && (
          <Typography variant={isDesktop ? TYPOGRAPHY.H4 : TYPOGRAPHY.OVERLINE} gutterBottom>
            {t('production.label').toUpperCase()}
          </Typography>
        )} */}
    
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
            <Box sx={{ display: 'flex', mt: -1 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                 Meterage Production
              </Typography>
            </Box>
            {graphData?.length > 0 && (
              <Fragment>
                <LogStackedChart
                  processGraphData={(skipZeroValues) => processGraphData(logsGraphData, timePeriod, dateFrom, dateTo, skipZeroValues, unitType)}
                  graphLabels={graphLabels}
                  graphHeight={graphHeight}
                  onExpand={handleExpandGraph}
                  producedData={producedData} 
                  machineSerialNo={getGraphTitle()}
                  unitType={unitType}
                />
              </Fragment>
            )}
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

const unitConvertedValues = (valueInMeters, selectedSystem) => {
  if (selectedSystem === 'Imperial') {
    const convertedValue = valueInMeters * 39.37;
    return Number(convertedValue.toFixed(2));
  }
  return Number(valueInMeters.toFixed(2));
}

ERPProductionTotal.propTypes = {
  logsGraphData: PropTypes.array,
  timePeriod: PropTypes.string,
  customer: PropTypes.object,
  graphLabels: PropTypes.object,
  isDashboard: PropTypes.bool,
  graphHeight: PropTypes.number,
  dateFrom: PropTypes.instanceOf(Date),
  dateTo: PropTypes.instanceOf(Date),
  machineSerialNo: PropTypes.string, 
  unitType: PropTypes.oneOf(['Metric', 'Imperial']),
}

export default ERPProductionTotal;