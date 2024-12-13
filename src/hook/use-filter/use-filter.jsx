import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { debounce } from 'lodash'
import { dispatch } from 'store'
import { useTable } from 'hook'
import { applySort } from 'util'
import { filterProperties } from './query-pool'
import { getProperty, getNestedProperty } from './get-property'

/**
 * don't remove------------------using useFilter hook-----------------
 *
 * @param {*} comparator - getComparator(order, orderBy), used to sort the data by assigned order, came from  useTable hook
 * @param {*} params - dataset to be filtered
 * @param {*} initial - initial state of the dataset, usually comes from the reducer
 * @returns filteredData - filtered data, rename to dataFiltered
 * @returns isFiltered - boolean, true if filterName or filterStatus is not empty
 * @returns filterName - string, initial value of the filterName
 * @returns filterStatus - array, initial value of the filterStatus
 * @returns handleFilterName - function, handle filterName change
 * @returns handleFilterStatus - function, handle filterStatus change
 *
 * @example
 * const {
 *  filterName,
 * filterStatus,
 * isFiltered,
 * handleFilterName,
 * handleFilterStatus,
 * filteredData: dataFiltered,
 * } = useFilter(getComparator(order, orderBy), techparams, initial);
 *
 * @param order - string, param to be sorted, came from  useTable hook
 * @param orderBy - string, param to be sorted, came from  useTable hook
 */

export default function useFilter(comparator, params, initial, ChangePage, setFilterBy) {
 const [tableData, setTableData] = useState([])
 const [filterName, setFilterName] = useState('')
 const [filterStatus, setFilterStatus] = useState('active')
 const [filterRole, setFilterRole] = useState('all')
 const { setPage } = useTable({ defaultOrderBy: 'name' })
 const isFiltered = filterName !== '' || filterStatus !== 'all' || filterRole !== 'all'
 const inputData = tableData

 const debouncedSearch = useRef(
  debounce(value => {
   dispatch(ChangePage(0))
   dispatch(setFilterBy(value))
  }, 500)
 )

 useEffect(() => {
  if (initial) {
   const sortedData = applySort({
    inputData: params,
    comparator: comparator
   })
   setTableData(sortedData)
  }
 }, [params, initial, comparator])

 // filterFunction is a callback function that is used to filter the data, normalizing the parameters
 const filterFunction = useCallback(
  (filterParameter, filterValue, properties) => {
   const lowerCaseFilterName = filterName?.toLowerCase()

   return properties.some(property => {
    const propertyValue = getProperty(filterParameter, property)
    if (!propertyValue) {
     return false
    }

    const lowerCasePropertyValue = String(propertyValue)?.toLowerCase()
    if (lowerCasePropertyValue.includes(lowerCaseFilterName)) {
     return true
    }
    // *still under development | this is for nested properties
    const nestedProperties = property.split('.').slice(0, -1)

    if (nestedProperties.length > 0) {
     const nestedPropertyValue = getNestedProperty(filterParameter, nestedProperties)
     const lowerCaseNestedPropertyValue = String(nestedPropertyValue)?.toLowerCase()
     return lowerCaseNestedPropertyValue.includes(lowerCaseFilterName)
    }

    return false
   })
  },
  [filterName]
 )

 const handleFilterName = event => {
  debouncedSearch.current(event.target.value)
  setPage(0)
  setFilterName(event.target.value)
 }

 const handleFilterStatus = (event, value) => {
  event.preventDefault()
  setPage(0)
  setFilterStatus(value)
 }

 const handleFilterRole = event => {
  setPage(0)
  setFilterRole(event.target.value)
 }

 const handleResetFilter = () => {
  setFilterName('')
  setFilterRole('all')
  setFilterStatus('active')
 }

 // useMemo is used to memoize the filteredData, so it will not be re-rendered if the data is not changed
 const filteredData = useMemo(() => {
  let filterVal = inputData

  if (filterVal) {
   filterVal = filterVal.filter(item => filterFunction(item, filterName, filterProperties))

   if (filterStatus === 'active') {
    filterVal = filterVal.filter(obj => obj.isActive === true)
   } else if (filterStatus === 'inActive') {
    filterVal = filterVal.filter(obj => obj.isActive === false)
   }

   if (filterRole !== 'all') {
    filterVal = filterVal.filter(item => item.role === filterRole)
   }
  }

  return filterVal
 }, [inputData, filterRole, filterName, filterFunction, filterStatus])

 return {
  filterName,
  filterRole,
  filterStatus,
  isFiltered,
  handleFilterName,
  handleFilterStatus,
  handleFilterRole,
  handleResetFilter,
  filteredData
 }
}
