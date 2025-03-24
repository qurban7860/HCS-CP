import { COUNTRY } from 'constant'
import { normalizer } from './format'

export const getCountryCode = countryName => {
 return COUNTRY.filter(country => normalizer(country.label) === normalizer(countryName))?.[0]?.code || null
}
