import { useEffect } from 'react'
import { useLocation, matchPath } from 'react-router-dom'

function useActiveLink(path, deep = true) {
  const { pathname } = useLocation()

  const normalActive = path ? !!matchPath({ path, end: true }, pathname) : false
  const deepActive = path ? matchPath({ path, end: false }, pathname) : false

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path.includes('http')
  }
}

export default useActiveLink
