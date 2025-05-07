import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'store'
import { ICON_NAME, Icon, useSettingContext } from 'hook'
import { PATH_MACHINE } from 'route/path'
import { getMachines } from 'store/slice'
import { TableBody, TableCell, Grid } from '@mui/material'
import { LinkWrap } from 'component'
import { ProfileDialog } from 'component/dialog'
import { Iconify } from 'component/iconify'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox, GStyledTooltip } from 'theme/style'
import { KEY } from 'constant'
import { StyledIconListItemText, StyledTableRow } from './style'

const MachineTable = ({ columns, onViewRow, machine, index, selected }) => {
  const { themeMode } = useSettingContext()
  const theme = useTheme()
  const navigate = useNavigate()
  const lowercaseRow = {}
  const [manufactureProfilesAnchorEl, setManufactureProfilesAnchorEl] = useState(null)
  const [manufactureProfiles, setManufactureProfiles] = useState([])

  const activeColor = themeMode === KEY.DARK ? theme.palette.howick.burnIn : theme.palette.burnIn.altDark
  const inactiveColor = theme.palette.howick.error

  const handleOnClick = (event, id) => {
    event.preventDefault()
    navigate(PATH_MACHINE.machines.view(id))
  }

  Object.entries(machine).forEach(([key, value]) => {
    if (typeof key === 'string') lowercaseRow[key.toLowerCase()] = value
  })

  const handleManufacturePopoverOpen = (event) => {
    setManufactureProfilesAnchorEl(event.currentTarget)
    setManufactureProfiles(machine?.profiles || [])
  }

  const handleManufacturePopoverClose = () => {
    setManufactureProfilesAnchorEl(null)
    setManufactureProfiles([])
  }

  return (
    <Fragment>
      <TableBody>
        <StyledTableRow index={index} mode={themeMode} machine={machine} selected={selected}>
          {columns?.map((column, colIndex) => {
            const cellValue = lowercaseRow?.[column.id.toLowerCase()] || ''
            let content = null

            if (column.checked) {
              if (column.id === 'serialNo') {
                content = (
                  <GStyledSpanBox>
                    <LinkWrap param={machine?.serialNo} onClick={e => handleOnClick(e, machine?._id)} />
                  </GStyledSpanBox>
                )
              } else if (column.id === 'isActive') {
                content = (
                  <StyledIconListItemText inActive={machine?.isActive}>
                    <m.div>
                      {machine?.isActive ? (
                        <Icon icon={ICON_NAME.ACTIVE} color={activeColor} />
                      ) : (
                        <Icon icon={ICON_NAME.INACTIVE} color={inactiveColor} />
                      )}
                    </m.div>
                  </StyledIconListItemText>
                )
              } else if (column.id === 'profiles') {
                if (Array.isArray(machine?.profiles) && machine.profiles.length > 0) {
                  if (machine.profiles.length === 1) {
                    content = machine.profiles[0]?.defaultName
                  } else {
                    content = (
                      <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        {`${machine?.profiles[0]?.defaultName || ''}, `}
                        <GStyledTooltip
                          title="Profiles"
                          placement="top"
                          disableFocusListener
                          tooltipcolor={theme.palette.primary.main}
                          color={theme.palette.primary.main}
                        >
                          <Iconify
                            icon="mingcute:profile-line"
                            onClick={handleManufacturePopoverOpen}
                            sx={{ mr: 0.5 }}
                          />
                        </GStyledTooltip>
                      </Grid>
                    )
                  }
                }
              } else if (typeof column?.value === 'function') {
                const result = column.value(machine)
                if (typeof result === 'string') {
                  content = result
                }
              } else if (typeof cellValue === 'string') {
                content = cellValue
              }
            }

            return (
              <TableCell
                key={colIndex}
                onClick={onViewRow}
                sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(0.97)', transition: 'ease-in-out 0.2s' } }}
                align={column?.numerical ? 'right' : 'left'}
              >
                {content}
              </TableCell>
            )
          })}
        </StyledTableRow>
        <ProfileDialog
          open={Boolean(manufactureProfilesAnchorEl)}
          onClose={handleManufacturePopoverClose}
          ListArr={manufactureProfiles || []}
          ListTitle="Manufacture Profiles"
        />
      </TableBody>
    </Fragment>
  )
}

MachineTable.propTypes = {
  machine: PropTypes.object,
  index: PropTypes.number,
  isArchived: PropTypes.bool,
  selected: PropTypes.bool,
  onViewRow: PropTypes.func,
  handleOnClick: PropTypes.func,
  columns: PropTypes.array
}

export default MachineTable
