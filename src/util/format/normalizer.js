export function normalizer(str) {
 return str?.trim()?.toLowerCase()
}

export function normalizeLang(str) {
 return str?.trim()?.replace(/[_ ]/g, '_')?.toLowerCase()
}

export function camelCaseNormalizer(camelCaseString) {
 const spaced = camelCaseString.replace(/([a-z])([A-Z])|([A-Z])([A-Z][a-z])/g, '$1$3 $2$4')
 const capitalized = spaced.charAt(0).toUpperCase() + spaced.slice(1)
 return capitalized.replace(/\s+([A-Z])(?=[A-Z][a-z]|\d|\W|$)(?<!\s[A-Z])/g, '$1')
}
