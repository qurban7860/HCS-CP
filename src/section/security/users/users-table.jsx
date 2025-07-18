import { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useSelector } from 'store'
import { ICON_NAME, Icon, useSettingContext } from 'hook'
import { Box, Link, TableBody, TableCell, Typography } from '@mui/material'
import { ChipsGrid, CustomAvatar, LinkWrap, BadgeStatus } from 'component'
import { useTheme } from '@mui/material/styles'
import { GStyledFieldChip, GStyledSpanBox } from 'theme/style'
import { ICON } from 'config/layout'
import { KEY, TYPOGRAPHY, SIZE } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const UsersTable = ({ columns, onViewRow, row, index, selected, handleNameOnClick, handleNavigateToContact }) => {
 const { contacts } = useSelector(state => state.contact)
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const lowercaseRow = {}
 const { name, ...restOfRow } = row
 const activeColor = themeMode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
 const inactiveColor = theme.palette.howick.error

 Object.entries(row).forEach(([key, value]) => {
  if (typeof key === 'string') lowercaseRow[key.toLocaleLowerCase()] = value
 })


 const isUserContact = contacts?.some(contact => contact?.email === restOfRow?.email)
 const UserContact = isUserContact ? contacts?.find(contact => contact?.email === restOfRow?.email) : null
 const contactName = isUserContact && UserContact?.firstName

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
        align={column?.align}>
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
           onClick={e => {
            handleNameOnClick(e, row?._id)
           }}
          />
         </GStyledSpanBox>
        ) : column.id === 'role' ? (
         <ChipsGrid isRole chips={restOfRow?.roles} chipKey={'name'} />
        ) : column.id === 'isActive' ? (
         <StyledIconListItemText inActive={restOfRow?.isActive}>
          <m.div>
           {restOfRow?.isActive ? <Icon icon={ICON_NAME.ACTIVE} color={activeColor} sx={{ ...ICON.SIZE_XS }} /> : <Icon icon={ICON_NAME.INACTIVE} color={inactiveColor} sx={{ ...ICON.SIZE_XS }} />}
          </m.div>
         </StyledIconListItemText>
        ) : // add a flag to check if the user is a contact?
        column.id === 'contact' ? (
          <m.div>
           {isUserContact ? (
            <Link onClick={() => handleNavigateToContact(restOfRow?.contact?._id)}>
                <GStyledFieldChip
                mode={themeMode}
                label={<Typography variant={TYPOGRAPHY.OVERLINE1}>{contactName}</Typography>}
                icon={<Icon icon={ICON_NAME.CONTACT_DEFAULT} color={theme.palette.common.white} sx={{ ...ICON.SIZE_XS }} />}
                size={SIZE.SMALL}
                />
            </Link>
           ) : (
            <Icon icon={ICON_NAME.CLOSE} color={inactiveColor} sx={{ ...ICON.SIZE_XS }} />
           )}
          </m.div>
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
 handleNameOnClick: PropTypes.func,
 handleNavigateToContact: PropTypes.func,
 columns: PropTypes.array
}

export default memo(UsersTable)
