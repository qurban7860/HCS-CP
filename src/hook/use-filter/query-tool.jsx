import { useCallback, useMemo } from 'react'
import { getProperty, getNestedProperty } from './get-property'

const filterFunction = useCallback((filterParameter, filterValue, properties) => {
  const lowerCaseFilterName = filterValue?.toLowerCase() || ''

  return properties.some((property) => {
    const propertyValue = getProperty(filterParameter, property)
    if (!propertyValue) {
      return false
    }

    const lowerCasePropertyValue = String(propertyValue)?.toLowerCase()
    if (lowerCasePropertyValue.includes(lowerCaseFilterName)) {
      return true
    }

    const nestedProperties = property.split('.')
    if (nestedProperties.length > 1) {
      const nestedPropertyValue = getNestedProperty(filterParameter, nestedProperties)
      const lowerCaseNestedPropertyValue = String(nestedPropertyValue)?.toLowerCase()
      return lowerCaseNestedPropertyValue.includes(lowerCaseFilterName)
    }

    return false
  })
}, [])

const filteredData = useMemo(() => {
  const filterData = (data) => {
    return data.filter((item) => filterFunction(item, filterName, filterProperties))
  }

  const sortedData = inputData.sort(comparator)
  return filterData(sortedData)
}, [inputData, comparator, filterName, filterProperties, filterFunction])
