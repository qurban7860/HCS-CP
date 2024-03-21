import PropTypes from 'prop-types'
import { useState } from 'react'
// @mui
import { Switch, Stack, Button, TableRow, MenuItem, TableCell, Chip } from '@mui/material'
// components
import { Iconify } from 'component/iconify'
import { MenuPopover } from 'component/menu-popover'
import ConfirmDialog from 'component/confirm-dialog'
import { fDate } from 'util/format'
import { CustomAvatar } from 'component/avatar'
import { LinkTableCell } from '../components/ListTableTools/LinkTableCell'
import { useScreenSize } from 'hook'
import { BadgeStatus } from 'component/badge-status'
import { ICON } from 'constant/icon'
import { GStyledTooltip } from 'theme/style'

SecurityUserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
}

export default function SecurityUserTableRow({ row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const { email, name, roles, phone, createdAt, currentEmployee, isActive, isOnline } = row
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openPopover, setOpenPopover] = useState(null)

  const smScreen = useScreenSize('sm')
  const lgScreen = useScreenSize('lg')

  const handleOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }

  const handleClosePopover = () => {
    setOpenPopover(null)
  }
  const onDelete = () => {
    onDeleteRow()
    setOpenConfirm(false)
  }

  return (
    <TableRow hover selected={selected}>
      <Stack direction="row" alignItems="center">
        <CustomAvatar
          name={name}
          alt={name}
          BadgeProps={{
            badgeContent: <BadgeStatus status={isOnline ? 'online' : 'offline'} />,
          }}
          sx={{ ml: 1, my: 0.5, width: '30px', height: '30px' }}
        />
        <LinkTableCell align="left" onClick={onViewRow} param={name} />
      </Stack>
      {smScreen && <TableCell align="left">{email}</TableCell>}
      {smScreen && <TableCell align="left">{phone || ''}</TableCell>}
      {lgScreen && (
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {roles.map((obj, index) =>
            obj.roleType === 'SuperAdmin' ? (
              <Chip key={index} label={obj.name} sx={{ m: 0.2 }} color="secondary" />
            ) : (
              <Chip key={index} label={obj.name} sx={{ mx: 0.3 }} />
            )
          )}
        </TableCell>
      )}
      <TableCell align="center" key={isOnline}>
        <GStyledTooltip
          title={isOnline ? ICON.ONLINE.heading : ICON.OFFLINE.heading}
          placement="top"
          disableFocusListener
          tooltipcolor={isOnline ? ICON.ONLINE.color : ICON.OFFLINE.color}
          color={isOnline ? ICON.ONLINE.color : ICON.OFFLINE.color}
        >
          <Iconify
            color={isOnline ? ICON.ONLINE.color : ICON.OFFLINE.color}
            sx={{ height: 20, width: 20 }}
            icon={isOnline ? ICON.ONLINE.icon : ICON.OFFLINE.icon}
          />
        </GStyledTooltip>
      </TableCell>
      <TableCell align="center">
        <Switch checked={currentEmployee} disabled size="small" />
      </TableCell>
      <TableCell align="center">
        <Switch checked={isActive} disabled size="small" />
      </TableCell>
      <TableCell align="right">{fDate(createdAt)}</TableCell>
    </TableRow>
  )
}
