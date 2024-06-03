import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getConnectedMachineDialog, setMachineParent, setMachineConnected, resetMachine, setMachineDialog, getCustomer } from 'store/slice'
import { Grid, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTooltip } from 'theme/style'
import { useSettingContext } from 'hook'
import { FormHeader, IconTooltip } from 'component'
import { PATH_MACHINE } from 'route/path'
import { GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { VARIANT, SIZE, LABEL, KEY, FLEX } from 'constant'
import { truncate } from 'util/truncate'

const { TYPOGRAPHY } = VARIANT

const MachineConnectionWidget = ({ value, handleConnectedMachineDialog, handleMachineSiteDialog }) => {
  const [icon, setIcon] = useState(null)
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const { machine, machineDialog, isParent, isConnected } = useSelector((state) => state.machine)

  useEffect(() => {
    dispatch(setMachineDialog(false))
  }, [dispatch])

  const { Icon: LocIcon, iconSrc: decoilerSrc } = useIcon(ICON_NAME.DECOILER_DEF)
  const { iconSrc: parentSrc } = useIcon(ICON_NAME.PARENT)

  return (
    <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
        <FormHeader label={LABEL.CONNECTED_MACHINE(value?.machineConnection)} />
        <Grid container p={2}>
          {value?.machineConnection?.length > 0 ? (
            value?.machineConnection?.map((mach, index) => (
              <Fragment key={index}>
                <Grid item xs={8}>
                  <GStyledListItemText
                    primary={
                      mach &&
                      mach.connectedMachine &&
                      mach.connectedMachine.name && (
                        <GStyledSpanBox>
                          <IconButton
                            onClick={(e) => handleConnectedMachineDialog(e, mach.connectedMachine._id)}
                            size={SIZE.MEDIUM}
                            color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                            aria-label="view"
                            target={KEY.BLANK}
                            sx={{
                              padding: 0.5,
                              borderRadius: 2,
                              m: 0
                            }}>
                            <Typography variant={value?.machineConnection?.length > 1 ? TYPOGRAPHY.H4 : TYPOGRAPHY.H3}>
                              {truncate(mach?.connectedMachine?.serialNo, 35)}
                            </Typography>
                          </IconButton>
                          <GStyledTooltip
                            title={LABEL.DECOILER_DEF}
                            disableFocusListener
                            placement={KEY.TOP}
                            tooltipcolor={theme.palette.grey[500]}
                            color={theme.palette.grey[500]}>
                            <LocIcon icon={decoilerSrc} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                          </GStyledTooltip>
                        </GStyledSpanBox>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
                  <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
                    <IconTooltip
                      title={LABEL.SITE_VIEW(mach?.connectedMachine?.serialNo)}
                      icon={ICON_NAME.MAP_MARKER}
                      dimension={18}
                      onClick={(e) => handleMachineSiteDialog(e, mach.connectedMachine._id)}
                      color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
                      iconOnly
                      cursor
                    />
                    <IconTooltip
                      title={LABEL.NAVIGATE_TO(mach?.connectedMachine?.serialNo)}
                      icon={ICON_NAME.OPEN_IN_NEW}
                      dimension={18}
                      onClick={() => window.open(PATH_MACHINE.machines.view(mach?.connectedMachine?._id), KEY.BLANK)}
                      color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
                      iconOnly
                      cursor
                    />
                    {value?.isActive ? (
                      <IconTooltip
                        title={LABEL.ACTIVE}
                        icon={ICON_NAME.ACTIVE}
                        color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                        dimension={18}
                        px={0}
                        isActiveIcon
                        iconOnly
                      />
                    ) : (
                      <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={18} iconOnly />
                    )}
                  </GStyledSpanBox>
                </Grid>
              </Fragment>
            ))
          ) : value?.parentConnection?.length > 0 ? (
            value?.parentConnection?.map((mach, index) => (
              <Fragment key={index}>
                <Grid item xs={8}>
                  <GStyledListItemText
                    primary={
                      mach && (
                        <GStyledSpanBox>
                          <IconButton
                            onClick={(e) => handleConnectedMachineDialog(e, mach.machine._id)}
                            size={SIZE.MEDIUM}
                            color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                            aria-label="view"
                            target={KEY.BLANK}
                            sx={{
                              padding: 0.5,
                              borderRadius: 2,
                              m: 0
                            }}>
                            <Typography variant={value?.parentConnection?.length > 1 ? TYPOGRAPHY.H4 : TYPOGRAPHY.H3}>
                              {mach?.machine?.serialNo}
                            </Typography>
                          </IconButton>

                          <GStyledTooltip
                            title={LABEL.PARENT}
                            disableFocusListener
                            placement={KEY.TOP}
                            tooltipcolor={theme.palette.grey[500]}
                            color={theme.palette.grey[500]}>
                            <LocIcon icon={parentSrc} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                          </GStyledTooltip>
                        </GStyledSpanBox>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
                  <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
                    <IconTooltip
                      title={LABEL.SITE_VIEW(mach?.machine?.serialNo)}
                      icon={ICON_NAME.MAP_MARKER}
                      dimension={18}
                      onClick={(e) => handleMachineSiteDialog(e, mach.machine._id)}
                      color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
                      iconOnly
                      cursor
                    />
                    <IconTooltip
                      title={LABEL.NAVIGATE_TO(mach?.machine?.serialNo)}
                      icon={ICON_NAME.OPEN_IN_NEW}
                      onClick={() => window.open(PATH_MACHINE.machines.view(mach?.machine?._id), KEY.BLANK)}
                      color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
                      dimension={18}
                      iconOnly
                      cursor
                    />
                    {value?.isActive ? (
                      <IconTooltip
                        title={LABEL.ACTIVE}
                        icon={ICON_NAME.ACTIVE}
                        color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                        dimension={18}
                        px={0}
                        isActiveIcon
                        iconOnly
                      />
                    ) : (
                      <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={20} iconOnly />
                    )}
                  </GStyledSpanBox>
                </Grid>
              </Fragment>
            ))
          ) : (
            <Typography variant={TYPOGRAPHY.OVERLINE1} color="text.no">
              {LABEL.NO_CONNECTED_MACHINE}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

MachineConnectionWidget.propTypes = {
  value: PropTypes.object,
  handleConnectedMachineDialog: PropTypes.func,
  handleMachineSiteDialog: PropTypes.func
}

export default MachineConnectionWidget
