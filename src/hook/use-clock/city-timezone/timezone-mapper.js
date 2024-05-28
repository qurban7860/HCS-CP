import _ from 'lodash'
import cityMapping from './city-map.json'

/**
 * Finds the timezone for a given city.
 *
 * @param {string} city - The name of the city.
 * @returns {Array} - An array of timezone objects matching the given city.
 */
export function huntTimezone(city) {
  const cityLookup = _.filter(cityMapping, function (o) {
    return o.city.toLowerCase() === city.toLowerCase()
  })
  if (cityLookup && cityLookup.length) {
    return cityLookup
  } else {
    return []
  }
}

/**
 * Finds a partial match between an array of items and a search string.
 *
 * @param {Array} itemsToSearch - The array of items to search.
 * @param {string} searchString - The search string to match against the items.
 * @returns {boolean} - Returns true if there is a partial match, otherwise false.
 */
export function findPartialMatch(itemsToSearch, searchString) {
  const searchItems = searchString.split(' ')
  const isPartialMatch = searchItems.every(function (i) {
    return itemsToSearch.join().toLowerCase().indexOf(i.toLowerCase()) >= 0
  })
  return isPartialMatch
}

export function findFromCityStateProvince(searchString) {
  if (searchString) {
    const cityLookup = _.filter(cityMapping, function (o) {
      return findPartialMatch([o.city, o.state_ansi, o.province, o.country], searchString)
    })
    if (cityLookup && cityLookup.length) {
      return cityLookup
    } else {
      return []
    }
  } else {
    return []
  }
}
