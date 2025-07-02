import { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { Box, FormControlLabel, Checkbox, IconButton } from '@mui/material'
import { Iconify } from 'component'
import { GStyledTooltip } from 'theme/style'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'component'
import { fShortenNumber } from 'util/format'
import { KEY } from 'constant'

function LogStackedChart({ processGraphData, graphLabels, graphHeight = 500, onExpand, producedData = '', machineSerialNo, unitType = 'Metric' }) {
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const [skipZero, setSkipZero] = useState(false);
  const [chart, setChart] = useState({ categories: [], series: [] });

  const { categories, series } = chart
  const colors = [theme.palette.howick.darkBlue, theme.palette.howick.orange]
  const colorsDarkMode = [theme.palette.howick.bronze, theme.palette.howick.burnIn]

  const menuBackgroundColor = themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.grey[800]
  const menuTextColor = themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white

  useEffect(() => {
    const processedChartData = processGraphData(skipZero);
    if (processedChartData) {
      setChart(processedChartData);
    } else {
      setChart({ categories: [], series: [] });
    }
  }, [skipZero, processGraphData, unitType]);

  const unitLabel = unitType === 'Imperial' ? 'in' : 'm';

  const chartOptions = {
    chart: {
      type: 'bar',
      height: graphHeight,
      foreColor: themeMode === KEY.LIGHT ? theme.palette.grey[600] : theme.palette.grey[400],
      menubar: {
        style: {
          foreColor: themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white,
          cssClass: 'apexcharts-menu'
        }
      },

      toolbar: {
        show: true
      },
      stacked: true,
      animations: {
        enabled: false
      },
      events: {
        dataPointSelection: true
      },
      padding: {
        bottom: -65 
      }
    },
    colors: themeMode === KEY.LIGHT ? colors : colorsDarkMode,
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top',
          hideOverflowingLabels: false
        }
      },
      colors: {
        ranges: [
          {
            from: 0,
            to: Infinity,
            color: colors
          }
        ],
        backgroundBarColors: colors,
        backgroundBarOpacity: 1
      }
    },
    responsive: [
      {
        breakpoint: 400,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    grid: {
      borderColor: themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700],
      opacity: 0.3
    },
    dataLabels: {
      enabled: true,
      formatter(val, { seriesIndex, dataPointIndex, w }) {
        if (seriesIndex === 1) return ''
        const total = Number(val) + Number(w.config.series[1].data[dataPointIndex])
        return total === 0 ? '' : total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      },
      offsetY: -35,
      style: {
        fontSize: '10px',
        colors: [themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[400]]
      }
    },
    xaxis: {
      categories,
      position: 'bottom',
      labels: {
        offsetY: 0,
        rotate: -45,
        maxHeight: 60,
        rotateAlways: true
      },
      axisBorder: { show: false, color: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[700] },
      axisTicks: { show: false, color: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[700] },
      title: {
        text: `${machineSerialNo}${producedData ? `, ${producedData}` : ''}`,
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title'
        }
      }
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        formatter: (value) => fShortenNumber(value),
        // formatter: value => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        style: { fontSize: '10px', color: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[400] },
        offsetX: 10
      },
      title: {
        text: graphLabels?.yaxis,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          cssClass: 'apexcharts-yaxis-title',
          color: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[400]
        }
      }
    },
    legend: {
      onItemClick: {
        toggleDataSeries: false
      },
      offsetY: 15,
      itemMargin: {
        vertical: 5 
      }
    },
    tooltip: {
      followCursor: true,
      custom: ({ series: tooltipSeries, dataPointIndex, w }) => {
        let tooltipContent = `<div class="apexcharts-theme-light" style="padding: 4px;">`;
        let total = 0;

        tooltipSeries.forEach((s, index) => {
          const legend = w.globals.seriesNames[index];
          const color = w.globals.colors[index];
          const value = s[dataPointIndex];
          total += value;

          const valueText =
            value === 0
              ? ''
              : `${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ${unitLabel}`;

          tooltipContent += `
        <div class="apexcharts-tooltip-series-group apexcharts-active" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span class="apexcharts-tooltip-marker" style="background-color: ${color}; margin-right: 8px;"></span>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <span class="apexcharts-tooltip-text-y-label" style="margin-right: 8px;">${legend}:</span>
            <span class="apexcharts-tooltip-text-y-value">${valueText}</span>
          </div>
        </div>`
        })

        const totalText = total.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })

        tooltipContent += `
      <div class="apexcharts-tooltip-series-group apexcharts-active" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e0e0e0; padding-top: 4px; margin-top: 4px;">
        <div style="width: 100%; display: flex; justify-content: space-between;">
          <span class="apexcharts-tooltip-text-y-label" style="font-weight: bold;">Total Length (${unitLabel}):</span>
          <span class="apexcharts-tooltip-text-y-value" style="font-weight: bold;">${totalText}</span>
        </div>
      </div>`

        tooltipContent += `</div>`
        return tooltipContent
      }
    }
  }

  return (
    <Fragment>
      <style>{`
        .apexcharts-menu {
          background-color: ${menuBackgroundColor} !important;
          color: ${menuTextColor} !important;
          border-radius: 2px;
          border: 1px solid ${menuBackgroundColor};
        }
      `}</style>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mt: -5 }}>
        <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <FormControlLabel
          control={<Checkbox checked={skipZero} onChange={() => setSkipZero((prev) => !prev)} />}
          label="Empty or zero values skipped"
        />
        </Box>
        {onExpand && (
          <Box sx={{ ml: 'auto' }}>
          <GStyledTooltip
            placement="top"
            title="Full Screen"
            tooltipcolor={theme.palette.primary.main}>
            <IconButton size="large" color="primary" onClick={onExpand} sx={{ mr: -0.5 }}>
              <Iconify icon="fluent:expand-up-right-20-filled" />
            </IconButton>
          </GStyledTooltip>
          </Box>
        )}
      </Box>
      <Chart type='bar' series={series} options={chartOptions} height={chartOptions.chart.height} />
    </Fragment>
  )
}

LogStackedChart.propTypes = { processGraphData: PropTypes.func, graphLabels: PropTypes.object, graphHeight: PropTypes.number, onExpand: PropTypes.func, producedData: PropTypes.string, machineSerialNo: PropTypes.string, unitType: PropTypes.oneOf(['Metric', 'Imperial']) }

export default LogStackedChart
