import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ICON_NAME, Icon, useSettingContext } from 'hook'
import { PATH_MACHINE } from 'route/path'
import { Box, TableBody, TableCell } from '@mui/material'
import { ChipsGrid, CustomAvatar, LinkWrap, BadgeStatus } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox } from 'theme/style'
import { KEY, TYPOGRAPHY } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const UsersTable = ({ columns, onViewRow, row, index, selected }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const navigate = useNavigate()
 const lowercaseRow = {}
 const { name, ...restOfRow } = row
 const activeColor = themeMode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
 const inactiveColor = theme.palette.howick.error

 Object.entries(row).forEach(([key, value]) => {
  if (typeof key === 'string') lowercaseRow[key.toLocaleLowerCase()] = value
 })

 const handleOnClick = id => {
  navigate(PATH_MACHINE.machines.view(id))
 }

 const openInNewPage = id => {
  const url = PATH_MACHINE.machines.view(id)
  window.open(url, '_blank')
 }

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={themeMode} user={restOfRow} selected={selected}>
     {columns?.map((column, index) => {
      const cellValue = lowercaseRow?.[column.id.toLocaleLowerCase()] || ''
      return (
       <TableCell
        key={index}
        onClick={onViewRow}
        sx={{
         cursor: 'pointer',
         '&:hover': { transform: 'scale(0.97)', transition: 'ease-in-out 0.2s' }
        }}
        align={column?.numerical ? 'right' : 'left'}>
        {column.id === 'name' ? (
         <GStyledSpanBox>
          <Box mr={1}>
           <CustomAvatar
            inTableList
            BadgeProps={{
             badgeContent: <BadgeStatus status={restOfRow?.isOnline ? 'online' : 'offline'} />
            }}
            typography={TYPOGRAPHY.H6}
            alt={'display name'}
            name={name}
           />
          </Box>
          <LinkWrap
           param={name}
           onClick={() => {
            handleOnClick(row?._id)
           }}
           openInNewTab={() => openInNewPage(row?._id)}
          />
         </GStyledSpanBox>
        ) : column.id === 'role' ? (
         <ChipsGrid isRole chips={restOfRow?.roles} chipKey={'name'} />
        ) : column.id === 'isActive' ? (
         <StyledIconListItemText inActive={restOfRow?.isActive}>
          <m.div>{restOfRow?.isActive ? <Icon icon={ICON_NAME.ACTIVE} color={activeColor} /> : <Icon icon={ICON_NAME.INACTIVE} color={inactiveColor} />}</m.div>
         </StyledIconListItemText>
        ) : (
         cellValue
        )}
       </TableCell>
      )
     })}
    </StyledTableRow>
   </TableBody>
  </Fragment>
 )
}

UsersTable.propTypes = {
 row: PropTypes.object,
 mode: PropTypes.string,
 index: PropTypes.number,
 isArchived: PropTypes.bool,
 selected: PropTypes.bool,
 onViewRow: PropTypes.func,
 columns: PropTypes.array
}

export default UsersTable
