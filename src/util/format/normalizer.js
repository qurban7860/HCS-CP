export function normalizer(str) {
  return str?.trim()?.toLowerCase()
}

export function normalizeLang(str) {
  return str?.trim()?.replace(/[_ ]/g, '_')?.toLowerCase()
}
