import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { debounce } from 'lodash'
import { dispatch } from 'store'
import { useTable } from 'hook'
import { applySort } from 'util'
import { filterProperties } from './query-pool'
import { getProperty, getNestedProperty } from './get-property'
import { DECOILER_TYPE_ARR, KEY, REGEX } from 'constant'
import { normalizer } from 'util'

/**
 * ----------------------using useFilter hook-----------------------------
 *
 * @param {*} comparator - getComparator(order, orderBy), used to sort the data by assigned order, came from  useTable hook
 * @param {*} params - dataset to be filtered
 * @param {*} initial - initial state of the dataset, usually comes from the reducer
 * @returns filteredData - filtered data, rename to dataFiltered
 * @returns isFiltered - boolean, true if filterName, filterRole, filterCategory or filterStatus is not empty
 * @returns filterName - string, initial value of the filterName
 * @returns filterStatus - array, initial value of the filterStatus
 * @returns filterRole - array, initial value of the filterRole
 * @returns filterCategory - array, initial value of the filterCategory
 * @returns handleFilterName - function, handle filterName change
 * @returns handleFilterStatus - function, handle filterStatus change
 * @returns handleFilterRole - function, handle filter role change
 * @returns handleFilterCategory - array, initial value of the filterCategory
 *
 * @example
 * const {
 * filterName,
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

export default function useFilter(comparator, params, initial, ChangePage, setFilterBy, defaultOrderBy, setCategoryDefault = 'all') {
 const [tableData, setTableData] = useState([])
 const [filterName, setFilterName] = useState('')
 const [filterStatus, setFilterStatus] = useState('active')
 const [filterRole, setFilterRole] = useState('all')
 const [filterCategory, setFilterCategory] = useState(setCategoryDefault)
 const { setPage } = useTable({ defaultOrderBy: defaultOrderBy || 'name' })
 const isFiltered = filterName !== '' || filterStatus !== 'all' || filterRole !== 'all' || filterCategory !== 'all'
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

 const handleFilterRole = (event, value) => {
  event.preventDefault()
  setPage(0)
  setFilterRole(value)
 }

 const handleFilterCategory = (event, value) => {
  event.preventDefault()
  setPage(0)
  setFilterCategory(value)
 }

 const handleResetFilter = () => {
  setFilterName('')
  setFilterRole('all')
  setFilterStatus('active')
  setFilterCategory('all')
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
   if (filterRole === KEY.CUSTOMER_ADMIN) {
    filterVal = filterVal.filter(item => item.roles.some(obj => obj.name === KEY.CUSTOMER_ADMIN))
   } else if (filterRole === KEY.CUSTOMER_USER) {
    filterVal = filterVal.filter(item => item.roles.some(obj => obj.name === KEY.CUSTOMER_USER))
   }
   if (filterCategory === KEY.DECOILER) {
    filterVal = filterVal.filter(item => DECOILER_TYPE_ARR.some(type => normalizer(item?.machineModel?.name).includes(normalizer(type))))
   } else if (filterCategory === KEY.FRAMA_MACHINE) {
    filterVal = filterVal.filter(item => normalizer(item?.machineModel?.name)?.includes(KEY.FRAMA))
   } else if (filterCategory === KEY.H_SERIES_MACHINE) {
    filterVal = filterVal.filter(item => new RegExp(REGEX.H_SERIES).test(item?.machineModel?.name))
   } else if (filterCategory === KEY.CUSTOM_MACHINE) {
    filterVal = filterVal.filter(item => normalizer(item?.machineModel?.name)?.includes(KEY.CUSTOM))
   } else if (filterCategory === KEY.SPEEDFLOOR) {
    filterVal = filterVal.filter(item => normalizer(item?.machineModel?.name)?.includes(KEY.SPEEDFLOOR))
   } else if (filterCategory === KEY.STEEL_FRAMER_18GUAGE) {
    filterVal = filterVal.filter(item => normalizer(item?.machineModel?.name)?.includes(KEY.STEEL_FRAMER_18GUAGE))
   } else if (filterCategory === KEY.TOPHAT_MACHINE) {
    filterVal = filterVal.filter(item => normalizer(item?.machineModel?.name)?.includes(KEY.TOPHAT_MACHINE || 'TH'))
   } else if (filterCategory === KEY.ROLLFORMER) {
    filterVal = filterVal.filter(item => !DECOILER_TYPE_ARR.some(type => normalizer(item.machineModel.name).includes(normalizer(type))))
   }
  }
  return filterVal
 }, [inputData, filterRole, filterName, filterFunction, filterStatus, filterCategory])

 return {
  filterName,
  filterRole,
  filterStatus,
  filterCategory,
  isFiltered,
  handleFilterName,
  handleFilterStatus,
  handleFilterRole,
  handleFilterCategory,
  handleResetFilter,
  filteredData
 }
}
