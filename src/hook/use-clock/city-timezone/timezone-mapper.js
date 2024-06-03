import _ from 'lodash'
import cityMapping from 'config/city-map.json'

/**
 * Finds the timezone for a given city.
 *
 * @param {string} city - The name of the city.
 * @returns {Array} - An array of timezone objects matching the given city.
 */
export function huntTimezone(city, country) {
  const normalizedCity = sanitizeCityName(city)

  const cityLookups = cityMapping.filter((o) => o.city.toLowerCase() === normalizedCity.toLowerCase())
  if ((cityLookups.length > 1 && country) || (cityLookups.length === 0 && country)) {
    const countryLookup = cityLookups.find((o) => o.country.toLowerCase() === country.toLowerCase())
    return countryLookup ? countryLookup : {}
  } else if (cityLookups.length > 0) {
    return cityLookups[0]
  } else if (!cityLookups && country) {
    const partialLookup = findPartialMatch(cityMapping, normalizedCity)
    if (partialLookup) {
      const cityLookup = _.filter(cityMapping, function (o) {
        return findPartialMatch([o.city, o.state_ansi, o.province, o.country], normalizedCity)
      })
      return cityLookup.length > 0 ? cityLookup[0] : {}
    }
  } else {
    return {}
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

function sanitizeCityName(c) {
  const sanitizedCity = c
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
  return sanitizedCity
}
