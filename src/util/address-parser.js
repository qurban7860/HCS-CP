export function parseAddress(address) {
  const street = address?.street || ''
  const city = address?.city || ''
  const state = address?.state || ''
  const region = address?.region || ''
  const zip = address?.zip || ''
  const country = address?.country || ''

  const addressParts = [street, city, state, region, zip, country]
  const nonEmptyAddressParts = addressParts.filter((part) => part.trim() !== '')

  return nonEmptyAddressParts.join(', ')
}
