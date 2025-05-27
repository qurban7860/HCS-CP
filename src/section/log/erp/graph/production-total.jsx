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
import { processGraphData } from './utils/utils'

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

  const isNotFound = !isLoading && !graphData.length;

  const handleExpandGraph = () => {
    if (machineId) {
      navigate(PATH_MACHINE.machines.fullScreen.view(machineId), {
        state: {
          logsGraphData: logsGraphData, graphLabels, graphHeight, timePeriod, dateFrom, dateTo
        }
      });
    } else {
      navigate(PATH_LOGS.fullScreen, {
        state: {
          logsGraphData: logsGraphData, graphLabels, graphHeight, timePeriod, dateFrom, dateTo
        }
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
            {graphData?.length > 0 && (
              <Fragment>
                <LogStackedChart
                  processGraphData={(skipZeroValues) => processGraphData(logsGraphData, timePeriod, dateFrom, dateTo, skipZeroValues)}
                  graphLabels={graphLabels}
                  graphHeight={graphHeight}
                  onExpand={handleExpandGraph}
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

export default ERPProductionTotal;