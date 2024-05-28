import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getConnectedMachineDialog, setMachineParent, setMachineConnected, resetMachine, setMachineDialog, getCustomer } from 'store/slice'
import { Grid, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTooltip } from 'theme/style'
import { useSettingContext } from 'component/setting'
import { FormHeader, IconTooltip } from 'component'
import { PATH_MACHINE } from 'route/path'
import { GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { VARIANT, SIZE, LABEL, KEY, DECOILER, FILTER_TYPE, FLEX } from 'constant'
import { normalizer } from 'util/format'

const { TYPOGRAPHY } = VARIANT
const { ONE_HALF_T, THREE_T, FIVE_T, SIX_T } = DECOILER
const { THREE_TON } = FILTER_TYPE

const MachineConnectionWidget = ({ value, handleConnectedMachineDialog }) => {
  const [icon, setIcon] = useState(null)
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const { machine, machineDialog, isParent, isConnected } = useSelector((state) => state.machine)
  const isActive = (status) => (status ? LABEL.ACTIVE : LABEL.INACTIVE)

  const isDecoiler1_5T = (machineName) => normalizer(machineName)?.includes(ONE_HALF_T)
  const isDecoiler3T = (machineName) => {
    const normalizedMachineName = normalizer(machineName)
    return THREE_TON.some((str) => normalizedMachineName?.includes(str))
  }
  const isDecoiler5T = (machineName) => normalizer(machineName)?.includes(FIVE_T)
  const isDecoiler6T = (machineName) => normalizer(machineName)?.includes(SIX_T)

  const checkDecoilerType = (machineName) => {
    const normalizedMachineName = normalizer(machineName)

    if (isDecoiler1_5T(normalizedMachineName)) {
      return ONE_HALF_T
    } else if (isDecoiler3T(normalizedMachineName)) {
      setIcon(ICON_NAME.DECOILER_3T)
      return THREE_T
    } else if (isDecoiler5T(normalizedMachineName)) {
      setIcon(ICON_NAME.DECOILER_5T)
      return FIVE_T
    } else if (isDecoiler6T(normalizedMachineName)) {
      return SIX_T
    }
    return null
  }

  useEffect(() => {
    dispatch(setMachineDialog(false))
  }, [dispatch])

  useEffect(() => {
    const machineNames = value?.machineConnection?.map((mach) => mach?.connectedMachine?.name)

    const checkIsConnected = (mach) => Object.keys(mach).some((key) => mach[key])
    const checkIsParent = (mach) => Object.keys(mach).some((key) => mach[key])

    const checkConnected = checkIsConnected(value?.machineConnection)
    const checkParent = checkIsParent(value?.parentConnection)

    if (checkParent) {
      dispatch(setMachineParent(true))
      setIcon(ICON_NAME.PARENT)
    }

    if (checkConnected) {
      dispatch(setMachineConnected(true))
    }

    machineNames.forEach((machineName) => {
      if (checkDecoilerType(machineName) === THREE_T) {
        setIcon(ICON_NAME.DECOILER_3T)
      } else if (checkDecoilerType(machineName) === FIVE_T) {
        setIcon(ICON_NAME.DECOILER_5T)
      } else if (checkDecoilerType(machineName) === SIX_T) {
        setIcon(ICON_NAME.DECOILER_6T)
      } else if (checkDecoilerType(machineName) === ONE_HALF_T) {
        setIcon(ICON_NAME.DECOILER_1_5T)
      } else {
        setIcon(null)
      }
    })
  }, [value?.machineConnection])

  const { Icon: LocIcon, iconSrc } = useIcon(icon)

  return (
    <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
        <FormHeader label={LABEL.CONNECTED_MACHINE(value?.machineConnection)} />
        <Grid container p={2}>
          {value?.machineConnection?.length > 0 && isConnected ? (
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
                            onClick={() => handleConnectedMachineDialog(mach.connectedMachine._id)}
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
                              {mach?.connectedMachine?.serialNo}
                            </Typography>
                          </IconButton>
                          <GStyledTooltip
                            title={LABEL.DECOILER_DEF}
                            disableFocusListener
                            placement={KEY.TOP}
                            tooltipcolor={theme.palette.grey[500]}
                            color={theme.palette.grey[500]}>
                            <LocIcon icon={iconSrc} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                          </GStyledTooltip>
                        </GStyledSpanBox>
                      )
                    }
                    secondary={mach?.connectedMachine?.name}
                  />
                </Grid>
                <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
                  <GStyledSpanBox justifyContent={FLEX.FLEX_END}>
                    <IconTooltip
                      title={LABEL.NAVIGATE_TO(mach?.connectedMachine?.serialNo)}
                      icon={ICON_NAME.OPEN_IN_NEW}
                      dimension={20}
                      onClick={() => window.open(PATH_MACHINE.machines.view(mach?.connectedMachine?._id), KEY.BLANK)}
                      color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
                    />
                    {value?.isActive ? (
                      <IconTooltip
                        title={LABEL.ACTIVE}
                        icon={ICON_NAME.ACTIVE}
                        dimension={20}
                        isActiveIcon
                        color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                        px={0}
                      />
                    ) : (
                      <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={20} isActiveIcon />
                    )}
                  </GStyledSpanBox>
                </Grid>
              </Fragment>
            ))
          ) : value?.parentConnection?.length > 0 && isParent ? (
            value?.parentConnection?.map((mach, index) => (
              <Fragment key={index}>
                <Grid item xs={8}>
                  <GStyledListItemText
                    primary={
                      mach && (
                        <GStyledSpanBox>
                          <IconButton
                            onClick={() => handleConnectedMachineDialog(mach.machine._id)}
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
                            <LocIcon icon={iconSrc} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                          </GStyledTooltip>
                        </GStyledSpanBox>
                      )
                    }
                  />
                </Grid>
                <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
                  <GStyledSpanBox justifyContent={FLEX.FLEX_END}>
                    <IconTooltip
                      title={LABEL.NAVIGATE_TO(mach?.machine?.serialNo)}
                      icon={ICON_NAME.OPEN_IN_NEW}
                      dimension={20}
                      onClick={() => window.open(PATH_MACHINE.machines.view(mach?.machine?._id), KEY.BLANK)}
                      color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.lightGray}
                    />
                    {value?.isActive ? (
                      <IconTooltip
                        title={LABEL.ACTIVE}
                        icon={ICON_NAME.ACTIVE}
                        dimension={20}
                        isActiveIcon
                        color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                        px={0}
                      />
                    ) : (
                      <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} dimension={20} />
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
  value: PropTypes.object
}

export default MachineConnectionWidget
