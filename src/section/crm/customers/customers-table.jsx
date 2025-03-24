import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { Box, TableBody, TableCell, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTableChip } from 'theme/style'
import { LinkTableCell } from 'component/table-tool'
import { PATH_CUSTOMER } from 'route/path'
import { fDate } from 'util'
import { KEY, SIZE, TYPOGRAPHY } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const CustomerTable = ({ customer, mode, index }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const navigate = useNavigate()

 const activeColor = mode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
 const inactiveColor = theme.palette.howick.error

 const handleOnClick = id => {
  navigate(PATH_CUSTOMER.customers.view(id))
 }

 const address = []
 if (customer?.mainSite?.address?.city) {
  address.push((customer?.mainSite?.address?.city ?? '').trim())
 }
 if (customer?.address?.country) {
  address.push((customer?.mainSite?.address?.country ?? '').trim())
 }

 const openInNewPage = id => {
  const url = PATH_CUSTOMER.customers.view(id)
  window.open(url, '_blank')
 }

 return (
  <Fragment>
   <TableBody>
    <StyledTableRow index={index} mode={mode} customer={customer}>
     <LinkTableCell
      param={customer?.name}
      onClick={() => {
       handleOnClick(customer?._id)
      }}
      openInNewTab={() => openInNewPage(customer?._id)}
     />
     <TableCell>
      <Box>{customer?.clientCode}</Box>
     </TableCell>
     <TableCell>
      {customer?.tradingName?.map((alias, index) => (
       <GStyledTableChip key={index} mode={themeMode} size={SIZE.SMALL} label={<Typography variant={TYPOGRAPHY.BODY2}>{alias}</Typography>} />
      ))}
     </TableCell>
     <TableCell>
      {Object.values(address ?? {})
       .reverse()
       .map(value => (typeof value === 'string' ? value.trim() : ''))
       .filter(value => value !== '')
       .join(', ')}
     </TableCell>
     <TableCell>{fDate(customer?.createdAt)}</TableCell>
     <TableCell>
      <StyledIconListItemText inActive={customer?.isActive}>
       <m.div>{customer?.isActive ? <Icon icon={ICON_NAME.ACTIVE} color={activeColor} /> : <Icon icon={ICON_NAME.INACTIVE} color={inactiveColor} />}</m.div>
      </StyledIconListItemText>
     </TableCell>
    </StyledTableRow>
   </TableBody>
  </Fragment>
 )
}

CustomerTable.propTypes = {
 customer: PropTypes.object.isRequired,
 index: PropTypes.number.isRequired,
 mode: PropTypes.string.isRequired
}

export default CustomerTable
