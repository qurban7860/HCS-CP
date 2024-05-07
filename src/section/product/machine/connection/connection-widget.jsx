import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import { FormHeader } from 'component'
import { GStyledCenterBox, GStyledListItemText } from 'theme/style'
import { VARIANT, SIZE, LABEL, KEY } from 'constant'
import { StyledStatusChip } from '../style'

const MachineConnectionWidget = ({ value }) => {
  const { TYPOGRAPHY } = VARIANT

  const isActive = (status) => (status ? LABEL.ACTIVE : LABEL.INACTIVE)

  return (
    <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
        <FormHeader label={LABEL.CONNECTED_MACHINE(value?.machineConnection)} />
        <Grid container p={2}>
          {value?.machineConnection?.length > 0 ? (
            value?.machineConnection?.map((mach) => (
              <Fragment key={mach?._id}>
                <Grid item xs={8}>
                  <GStyledListItemText primary={mach?.connectedMachine?.serialNo} secondary={mach?.connectedMachine?.name} />
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
