import { useMemo } from 'react'
import { KEY } from 'constant'

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function handleComparator(order, orderBy) {
  return order === KEY.DESC
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export function getComparator(order, orderBy) {
  return useMemo(() => handleComparator(order, orderBy), [order, orderBy])
}
