import { useEffect, Fragment, useEffect } from 'react'
import { useIcon, ICON_NAME } from 'hook'
import { PATH_MACHINE } from 'route/path'
import { Grid, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledCenterBox, GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { VARIANT, SIZE, KEY, LABEL } from 'constant'
import { StyledStatusChip } from '../style'

/**
 * ⚠️ Currently under development:
 *
 * @summary LinkMachine
 *
 * - The LinkMachine component is used to display the machine connection
 *  this  component is used in the ConnectionWidget component to display the machine connection
 *
 * - this will logically display the connected machine, identify wheather its a connected machine or parent machine
 * -Team is still working on the data structure to be passed to this component, so this needs to be based on the data structure
 */

const { TYPOGRAPHY } = VARIANT

const LinkMachine = ({ connectionType, mach, isParent, isConnected }) => {
  const { Icon: LocIcon, iconSrc: iconSrc } = useIcon(ICON_NAME.LOCATION)
  const theme = useTheme()

  const isActive = (status) => (status ? LABEL.ACTIVE : LABEL.INACTIVE)
  // const isConnected = (mach) => Object.keys(mach).includes('parentMachine')
  // const isParent = (mach) => Object.keys(mach).includes('machineConnections')

  if (isParent) {
    mach = mach.connectedMachine
  } else {
    mach = mach
  }

  useEffect(() => {
    const isConnected = (mach) => Object.keys(mach).some((key) => mach[key])
    const isParent = (mach) => Object.keys(mach).some((key) => mach[key])

    const checkParent = isParent(value?.parentConnection) ? 'parent' : 'connected'

    switch (checkParent) {
      case 'parent':
        mach = value?.parentConnection
        break
      case 'connected':
        mach = value?.machineConnection
        connectedMachine = value?.machineConnection
        machine = value?.machineConnection

        break
    }
  }, [mach])

  return (
    <Fragment key={index}>
      <Grid item xs={8}>
        <GStyledListItemText
          primary={
            mach && (
              <GStyledSpanBox>
                <IconButton
                  onClick={() => window.open(PATH_MACHINE.machines.view(connectedMachine._id), KEY.BLANK)}
                  size={SIZE.MEDIUM}
                  color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                  aria-label="view"
                  sx={{
                    padding: 0.5,
                    borderRadius: 2,
                    m: 0
                  }}>
                  <Typography variant={value?.machineConnection?.length > 1 ? TYPOGRAPHY.H4 : TYPOGRAPHY.H3}>{mach?.serialNo}</Typography>
                </IconButton>
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
  )
}

export default LinkMachine
