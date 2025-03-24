import _ from 'lodash'
import cityMapping from 'config/city-map.json'

/**
 * Finds the timezone for a given city.
 *
 * @param {string} city - The name of the city.
 * @returns {Array} - An array of timezone objects matching the given city.
 */
export function huntTimezone(city, country, region) {
 if (!city || (!country && !region)) return null
 const normalizedCity = city ? city.trim().toLowerCase() : ''
 const normalizedCountry = country ? country.trim().toLowerCase() : ''
 const normalizedRegion = region ? region.trim().toLowerCase() : ''

 const matchedTimezone =
  cityMapping.find(
   entry =>
    normalizedCity &&
    entry.city.toLowerCase() === normalizedCity &&
    normalizedCountry &&
    entry.country.toLowerCase() === normalizedCountry &&
    normalizedRegion &&
    entry.province?.toLowerCase() === normalizedRegion
  ) ||
  cityMapping.find(entry => normalizedCity && entry.city.toLowerCase() === normalizedCity) ||
  cityMapping.find(entry => normalizedCity && (entry.city.toLowerCase().includes(normalizedCity) || entry.province?.toLowerCase().includes(normalizedCity))) ||
  cityMapping.find(entry => normalizedCountry && entry.country.toLowerCase() === normalizedCountry && normalizedRegion && entry.province?.toLowerCase() === normalizedRegion)

 return matchedTimezone || null
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
 if (!c) return ''
 const sanitizedCity = c
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]/g, '')
  .replace(/\s/g, '')
 return sanitizedCity
}
