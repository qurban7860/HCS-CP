/**
 *
 * @param {object} object - object to be filtered
 * @param {string} propertyPath  - property path to be filtered
 * @returns - object with filtered properties
 */
export function getProperty(object, propertyPath) {
  const properties = propertyPath.split(',')

  return properties.reduce((obj, property) => {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      return obj[property]
    }

    return undefined
  }, object)
}

/**
 *
 * @param {object} obj - object to be filtered
 * @param {string[]} properties - property path to be filtered
 * @param {string} filterName - filter name to be filtered
 * @returns
 */
export const getNestedProperty = (obj, properties, filterName) => {
  const [property, ...remainingProperties] = properties

  if (property) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const nextObj = obj[property]

      if (remainingProperties.length > 0) {
        return getNestedProperty(nextObj, remainingProperties, filterName)
      }

      // normalize spaces
      if (nextObj) {
        const lowerCasePropertyValue = String(nextObj).toLowerCase().replace(/\s+/g, ' ').trim()
        const lowerCaseFilterName = filterName.toLowerCase()
        return lowerCasePropertyValue.includes(lowerCaseFilterName)
      }
    }
  }

  return false
}
