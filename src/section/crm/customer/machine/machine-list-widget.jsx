import { Fragment, useEffect, useState } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dispatch } from 'store'
import { setIsDecoiler, getCustomerMachines, resetCustomerMachines, getMachineModel, getMachineModels } from 'store/slice'
import { Grid, Typography, IconButton, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledTooltip } from 'theme/style'
import { useSettingContext } from 'component/setting'
import { FormHeader, SkeletonViewFormField } from 'component'
import { PATH_MACHINE } from 'route/path'
import { GStyledCenterBox, GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { VARIANT, SIZE, LABEL, KEY, DECOILER, FILTER_TYPE } from 'constant'
import { normalizer } from 'util/format'
import { StyledStatusChip } from '../style'

const { TYPOGRAPHY } = VARIANT
const { ONE_HALF_T, THREE_T, FIVE_T, SIX_T } = DECOILER

const MachineListWidget = ({ value }) => {
  const [icon, setIcon] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const { customerMachines, isLoading } = useSelector((state) => state.machine)
  const { machineModels, machineModel } = useSelector((state) => state.machinemodel)

  const isActive = (status) => (status ? LABEL.ACTIVE : LABEL.INACTIVE)
  const decoilers = ['1.5T', '3.0T', '5.0T', '6.0T']

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await dispatch(getCustomerMachines(id))
      setLoading(false)
    }
    fetchData()
  }, [dispatch, id])

  useEffect(() => {
    const model = customerMachines?.map((mach) => mach?.machineModel?.name)

    model.forEach((machineName) => {
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
  }, [customerMachines, machineModel])

  const isDecoiler1_5T = (machineName) => normalizer(machineName)?.includes(ONE_HALF_T)
  const isDecoiler3T = (machineName) => normalizer(machineName)?.includes(THREE_T)
  const isDecoiler5T = (machineName) => normalizer(machineName)?.includes(FIVE_T)
  const isDecoiler6T = (machineName) => normalizer(machineName)?.includes(SIX_T)

  const checkDecoilerType = (machineName) => {
    const normalizedMachineName = normalizer(machineName)

    if (isDecoiler1_5T(normalizedMachineName)) {
      return ONE_HALF_T
    } else if (isDecoiler3T(normalizedMachineName)) {
      return THREE_T
    } else if (isDecoiler5T(normalizedMachineName)) {
      return FIVE_T
    } else if (isDecoiler6T(normalizedMachineName)) {
      return SIX_T
    } else {
      return null
    }
  }

  const { Icon: LocIcon, iconSrc } = useIcon(icon)

  return (
    <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
        <GStyledSpanBox>
          <FormHeader label={LABEL.MACHINE(value?.machines?.length)} />
        </GStyledSpanBox>

        <Grid container p={2}>
          {value?.machines.length > 0 ? (
            customerMachines.map((mach, index) => (
              <Fragment key={index}>
                <Grid item xs={8}>
                  <GStyledListItemText
                    primary={
                      mach && (
                        <GStyledSpanBox>
                          <IconButton
                            onClick={() => window.open(PATH_MACHINE.machines.view(mach._id), KEY.BLANK)}
                            size={SIZE.MEDIUM}
                            color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                            aria-label="view"
                            target={KEY.BLANK}
                            sx={{
                              padding: 0,
                              borderRadius: 2,
                              m: 0
                            }}>
                            <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H4}>
                              {mach?.serialNo}
                            </Typography>
                          </IconButton>
                          {decoilers.some((type) => mach?.machineModel?.name?.includes(type)) && (
                            <GStyledTooltip
                              title={LABEL.DECOILER_DEF}
                              disableFocusListener
                              placement={KEY.TOP}
                              tooltipcolor={theme.palette.grey[500]}
                              color={theme.palette.grey[500]}>
                              <LocIcon icon={iconSrc} color={theme.palette.grey[500]} sx={{ height: 15 }} />
                            </GStyledTooltip>
                          )}
                        </GStyledSpanBox>
                      )
                    }
                    secondary={
                      <Typography variant={TYPOGRAPHY.BODY2} color="text.secondary">
                        {mach?.machineModel?.name}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item xs={4} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
                  <GStyledCenterBox>
                    <StyledStatusChip
                      label={<Typography variant={TYPOGRAPHY.H6}>{isActive(mach?.isActive)}</Typography>}
                      size={SIZE.SMALL}
                      variant={VARIANT.OUTLINED}
                      isActive
                    />
                  </GStyledCenterBox>
                </Grid>
                {/* if in the last index dont add divider */}
                {index !== customerMachines?.length - 1 && <Divider variant="fullWidth" style={{ width: '100%', marginBottom: '10px' }} />}
              </Fragment>
            ))
          ) : loading ? (
            <m.div>
              <SkeletonViewFormField />
            </m.div>
          ) : (
            <Typography variant={TYPOGRAPHY.OVERLINE1} color="text.no">
              {LABEL.NO_MACHINE_FOUND}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

MachineListWidget.propTypes = {
  value: PropTypes.object
}

export default MachineListWidget
