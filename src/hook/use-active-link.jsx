import { useLocation, matchPath } from 'react-router-dom'
import { PATH_SUPPORT } from 'route/path'

function useActiveLink(path, deep = true) {
  const { pathname } = useLocation()

  const isCreatePage = matchPath({ path: PATH_SUPPORT.tickets.create, end: true }, pathname)

  // Special condition: if on "create", make "list" inactive
  if (path === PATH_SUPPORT.tickets.list && isCreatePage) {
    return {
      active: false,
      isExternalLink: path.includes('http')
    }
  }

  const normalActive = path ? !!matchPath({ path, end: true }, pathname) : false
  const deepActive = path ? matchPath({ path, end: false }, pathname) : false

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path.includes('http')
  }
}

export default useActiveLink
