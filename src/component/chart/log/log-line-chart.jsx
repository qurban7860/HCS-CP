import { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'component'
import { fShortenNumber } from 'util/format'
import { KEY } from 'constant'

const formatNumber = num => {
 if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
 if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
 return num.toFixed(1)
}

function LogLineChart({ chart, graphLabels }) {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const { categories, series } = chart
 const colors = [theme.palette.howick.darkBlue, theme.palette.howick.orange]
 const colorsDarkMode = [theme.palette.howick.orange, theme.palette.howick.lightGray]

 const menuBackgroundColor = themeMode === KEY.LIGHT ? theme.palette.common.white : theme.palette.grey[800]
 const menuTextColor = themeMode === KEY.LIGHT ? theme.palette.common.black : theme.palette.common.white

 const [isVisible, setIsVisible] = useState(true)

 useEffect(() => {
  if (!chart.categories || chart.categories.length === 0) {
   console.warn('No categories provided for xaxis.')
   setIsVisible(false)
  }
  if (!chart.series || chart.series.length === 0) {
   console.warn('No series data provided.')
   setIsVisible(false)
  }
 }, [chart])

 const chartOptions = {
  chart: {
   type: 'line',
   height: 500,
   foreColor: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[400],
   //  toolbar: { show: true },
   animations: { enabled: true }
  },
  responsive: [
   {
    breakpoint: 1000,
    options: {
     chart: { width: '100%' },
     legend: { position: 'bottom' }
    }
   }
  ],
  colors: themeMode === KEY.LIGHT ? colors : colorsDarkMode,
  stroke: {
   curve: 'straight',
   width: 3
  },
  xaxis: {
   categories,
   position: 'bottom',
   labels: { offsetY: 0 },
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
   title: {
    text: graphLabels?.yaxis,
    offsetX: 0,
    offsetY: 0,
    style: {
     fontSize: '12px',
     fontWeight: 600,
     cssClass: 'apexcharts-yaxis-title',
     color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[400]
    }
   },
   labels: { formatter: value => fShortenNumber(value), style: { fontSize: '12px', color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[400] } }
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
  },
  legend: {
   show: true,
   position: 'top',
   fontSize: '14px',
   labels: { colors: '#424242' },
   onItemClick: {
    toggleDataSeries: false
   }
  },
  grid: {
   borderColor: themeMode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[700],
   opacity: 0.3
  },
  // dataLabels: {
  //  enabled: true,
  //  formatter(val, { seriesIndex, dataPointIndex, w }) {
  //   if (seriesIndex === 1) return ''
  //   return `${(Number(val) + Number(w.config.series[1].data[dataPointIndex])).toFixed(2)}`
  //  },
  //  offsetY: -25,
  //  style: {
  //   fontSize: '12px',
  //   colors: [themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[400]]
  //  }
  // },
  markers: {
   size: 4
  },
  fill: {
   type: 'gradient'
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
   <Chart type='line' series={series} options={chartOptions} height={chartOptions.chart.height} />
  </Fragment>
 )
}

LogLineChart.propTypes = { chart: PropTypes.object, graphLabels: PropTypes.object, timePeriod: PropTypes.array }

export default LogLineChart
