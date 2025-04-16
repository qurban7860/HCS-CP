import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'component'
import { fShortenNumber } from 'util/format'
import { KEY } from 'constant'

function LogStackedChart({ chart, graphLabels, graphHeight = 500 }) {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const { categories, series } = chart
 const colors = [theme.palette.howick.darkBlue, theme.palette.howick.orange]
 const colorsDarkMode = [theme.palette.howick.bronze, theme.palette.howick.burnIn]

 const menuBackgroundColor = themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.grey[800]
 const menuTextColor = themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white

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
    enabled: true
   },
   events: {
    dataPointSelection: true
   }
  },
  colors: themeMode === KEY.LIGHT ? colors : colorsDarkMode,
  plotOptions: {
   bar: {
    horizontal: false,
    dataLabels: {
     position: 'top',
     hideOverflowingLabels: false,
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
    return `${(Number(val) + Number(w.config.series[1].data[dataPointIndex])).toFixed(2)}`
   },
   offsetY: -25,
   style: {
    fontSize: '12px',
    colors: [themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[400]]
   }
  },
  xaxis: {
   categories,
   position: 'bottom',
   labels: { 
    offsetY: 0,
    rotate: -45,
    rotateAlways: graphLabels?.xaxis === "Days" 
  },
   axisBorder: { show: false, color: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[700] },
   axisTicks: { show: false, color: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[700] },
   title: {
    text: graphLabels?.xaxis,
    offsetX: 0,
    offsetY: 0,
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
   labels: { formatter: value => fShortenNumber(value), style: { fontSize: '10px', color: themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[400] } },
   title: {
    text: graphLabels?.yaxis,
    offsetX: 15,
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
   }
  },
  tooltip: {
   custom: ({ series: tooltipSeries, seriesIndex, dataPointIndex, w }) => {
    let tooltipContent = `<div class="apexcharts-theme-light">`
    tooltipSeries.forEach((s, index) => {
     const legend = w.globals.seriesNames[index]
     const color = w.globals.colors[index]
     const value = s[dataPointIndex].toFixed(2)
     tooltipContent += `<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">`
     tooltipContent += `<span class="apexcharts-tooltip-marker" style="background-color: ${color};"></span>`
     tooltipContent += `<div class="apexcharts-tooltip-text"><div class="apexcharts-tooltip-y-group">`
     tooltipContent += `<span class="apexcharts-tooltip-text-y-label">${legend}:</span>`
     tooltipContent += `<span class="apexcharts-tooltip-text-y-value">${value}</span></div></div></div>`
    })

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
   <Chart type='bar' series={series} options={chartOptions} height={chartOptions.chart.height} />
  </Fragment>
 )
}

LogStackedChart.propTypes = { chart: PropTypes.object, graphLabels: PropTypes.object, graphHeight: PropTypes.number }

export default LogStackedChart
