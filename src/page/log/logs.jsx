import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'

import { GraphsSection, LogsSection } from 'section/log'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getMachines } from 'store/slice'

const LogsList = () => {
 const [searchParams] = useSearchParams()
 const isGraphPage = () => searchParams.get('type') === 'graph'
  const { machines } = useSelector(state => state.machine)
  const { customer } = useSelector(state => state.customer)

   useEffect(() => {
     const debounce = _.debounce(() => {
       if (!machines?.length) {
         dispatch(getMachines(null, null, false, null, customer?._id))
       }
     }, 300)
     debounce()
     return () => debounce.cancel()
   }, [dispatch])
 
 return (
  <>
    {isGraphPage() ? (
     <GraphsSection />
    ) : (
     <LogsSection />
    )}
  </>
)
}

export default LogsList
