import { Fragment, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FormHeader } from 'component'
import { GStyledCenterBox, GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { VARIANT, SIZE, LABEL, KEY, DECOILER, FILTER_TYPE } from 'constant'
import { normalizer } from 'util/format'
import { StyledStatusChip } from '../style'

const { TYPOGRAPHY } = VARIANT
const { ONE_HALF_T, THREE_T, FIVE_T, SIX_T } = DECOILER
const { THREE_TON } = FILTER_TYPE

const MachineConnectionWidget = ({ value }) => {
  const [icon, setIcon] = useState(null)
  const theme = useTheme()
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
    const machineNames = value?.machineConnection?.map((mach) => mach?.connectedMachine?.name)
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
                          {mach?.connectedMachine?.serialNo}
                          <LocIcon icon={iconSrc} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                        </GStyledSpanBox>
                      )
                    }
                    secondary={mach?.connectedMachine?.name}
                  />
                </Grid>
                <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
                  <GStyledCenterBox>
                    <StyledStatusChip
                      label={<Typography variant={TYPOGRAPHY.H6}>{isActive(mach.isActive)}</Typography>}
                      size={SIZE.SMALL}
                      variant={VARIANT.OUTLINED}
                      isActive={mach?.isActive}
                    />
                  </GStyledCenterBox>
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
