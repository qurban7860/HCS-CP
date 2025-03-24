import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { EmptyContent } from 'component'
import { FALLBACK } from 'constant'

const NoData = ({ isNotFound, ticketNotFound, logNotFound }) => {
 const { themeMode } = useSettingContext()
 return (
  <Fragment>
   {isNotFound ? (
    <EmptyContent
     {...FALLBACK.NO_DATA}
     sx={{
      color: themeMode === 'dark' ? 'text.secondary' : 'grey.700'
     }}
    />
   ) : logNotFound ? (
    <EmptyContent
     {...FALLBACK.NO_LOG}
     sx={{
      color: themeMode === 'dark' ? 'text.secondary' : 'grey.700'
     }}
    />
   ) : (
    ticketNotFound && (
     <EmptyContent
      {...FALLBACK.NO_TICKET}
      sx={{
       color: themeMode === 'dark' ? 'text.secondary' : 'grey.700'
      }}
     />
    )
   )}
  </Fragment>
 )
}

NoData.propTypes = {
 isNotFound: PropTypes.bool,
 ticketNotFound: PropTypes.bool,
 logNotFound: PropTypes.bool
}

export default NoData
