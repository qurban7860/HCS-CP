import { Fragment, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useActiveLink, useSettingContext } from 'hook'
import { GStyledPopover } from './style'
import NavItem from './nav-item'
import { KEY } from 'constant'

NavListY.propTypes = {
 data: PropTypes.object.isRequired,
 depth: PropTypes.number.isRequired,
 hasChild: PropTypes.bool,
 handleCloseNavItem: PropTypes.func
}

function NavListY({ data, depth, hasChild, handleCloseNavItem }) {
 const [open, setOpen] = useState(false)
 const navRef = useRef(null)
 const { themeMode } = useSettingContext()
 const { pathname } = useLocation()
 const { active, isExternalLink } = useActiveLink(data.path)

 useEffect(() => {
  if (open) {
   handleClose()
  }
 }, [pathname])

 useEffect(() => {
  const appBarEl = Array.from(document.querySelectorAll('.MuiAppBar-root'))
  const styles = () => {
   document.body.style.overflow = ''
   document.body.style.padding = ''
   appBarEl.forEach(elem => {
    elem.style.padding = ''
   })
  }

  if (open) {
   styles()
  } else {
   styles()
  }
 }, [open])

 const handleOpen = () => {
  setOpen(true)
 }

 const handleClose = () => {
  setOpen(false)
 }

 return (
  <Fragment>
   <NavItem
    ref={navRef}
    item={data}
    depth={depth}
    open={open}
    active={active}
    onListItemClick={handleCloseNavItem}
    isExternalLink={isExternalLink}
    onMouseEnter={handleOpen}
    onMouseLeave={handleClose}
    sx={{
     //  transition: 'background-color 0.3s',
     backgroundColor: 'transparent',
     '& .MuiTypography-root': {
      color: themeMode === KEY.LIGHT ? (active ? 'common.white' : 'grey.900') : active && 'common.black',
      fontWeight: active ? 'bold' : 'normal',
      '&:hover': {
       color: themeMode === KEY.LIGHT ? 'grey.500' : 'grey.700',
       scale: 0.9,
       transition: 'ease-in-out 0.2s'
      }
     }
    }}
   />

   {hasChild && (
    <GStyledPopover
     open={open}
     anchorEl={navRef.current}
     anchorOrigin={depth === 1 ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'center', horizontal: 'right' }}
     transformOrigin={depth === 1 ? { vertical: 'top', horizontal: 'left' } : { vertical: 'center', horizontal: 'left' }}
     PaperProps={{
      onMouseEnter: handleOpen,
      onMouseLeave: handleClose
     }}>
     <NavSubList data={data.children} depth={depth} />
    </GStyledPopover>
   )}
  </Fragment>
 )
}

NavSubList.propTypes = {
 data: PropTypes.array.isRequired,
 depth: PropTypes.number.isRequired
}

function NavSubList({ data, depth }) {
 return (
  <Fragment>
   {data.map(list => (
    <NavListY key={list.title + list.path} data={list} depth={depth + 1} hasChild={!!list.children} disabled={list.disabled} />
   ))}
  </Fragment>
 )
}

export default NavListY
