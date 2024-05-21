import { Fragment } from 'react'
import { m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSettingContext } from 'component/setting'
import { ICON_NAME, useIcon } from 'hook'
import { Box, TableBody, TableCell, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTableChip } from 'theme/style'
import { LinkTableCell } from 'component/table-tool'
import { PATH_CUSTOMER } from 'route/path'
import { fDate } from 'util'
import { KEY, SIZE, VARIANT } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const { BODY2 } = VARIANT.TYPOGRAPHY

const CustomerTable = ({ customer, mode, index }) => {
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const navigate = useNavigate()
  const { Icon, iconSrc: activeSrc } = useIcon(ICON_NAME.ACTIVE)
  const { iconSrc: inactiveSrc } = useIcon(ICON_NAME.INACTIVE)

  const activeColor = mode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
  const inactiveColor = theme.palette.howick.error

  const handleOnClick = (id) => {
    navigate(PATH_CUSTOMER.customers.view(id))
  }

  const address = []
  if (customer?.mainSite?.address?.city) {
    address.push((customer?.mainSite?.address?.city).trim())
  }
  if (customer?.address?.country) {
    address.push((customer?.mainSite?.address?.country).trim())
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
          />
          <TableCell>
            <Box>{customer?.clientCode}</Box>
          </TableCell>
          <TableCell>
            {customer?.tradingName?.map((alias, index) => (
              <GStyledTableChip key={index} mode={themeMode} size={SIZE.SMALL} label={<Typography variant={BODY2}>{alias}</Typography>} />
            ))}
          </TableCell>
          <TableCell>
            {Object.values(address ?? {})
              .reverse()
              .map((value) => (typeof value === 'string' ? value.trim() : ''))
              .filter((value) => value !== '')
              .join(', ')}
          </TableCell>
          <TableCell>{fDate(customer?.createdAt)}</TableCell>
          <TableCell>
            <StyledIconListItemText inActive={customer?.isActive}>
              <m.div>{customer?.isActive ? <Icon icon={activeSrc} color={activeColor} /> : <Icon icon={inactiveSrc} color={inactiveColor} />}</m.div>
            </StyledIconListItemText>
          </TableCell>
        </StyledTableRow>
      </TableBody>
    </Fragment>
  )
}

export default CustomerTable
