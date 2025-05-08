import { memo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { Grid, Autocomplete, TextField } from '@mui/material'
import { PATH_MACHINE } from 'route/path'
import { useMachineDefaultValues } from 'section/product'
import { MachineNav, MachineTab } from 'section/product/machine'
import { MotionLazyContainer, CustomerDialog, MachineDialog, SiteDialog } from 'component'
import { FLEX, FLEX_DIR } from 'constant'
import { useAuthContext } from 'auth/use-auth-context'
import {
    getMachine,
    getMachines,
    setCustomerDialog,
    setMachineDialog,
    setMachineSiteDialog,
    resetConnectedMachineDialog,
    resetMachineSiteDialogData,
    resetMachine,
    resetMachines,
    resetSoftwareVersion,
    getSoftwareVersion
} from 'store/slice'

const MachineModuleLayout = () => {
    const { machineId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuthContext();
    const { machine, isLoading, machines, connectedMachineDialog, machineSiteDialogData } = useSelector(state => state.machine)
    const { customer, customerDialog } = useSelector(state => state.customer)

    const defaultValues = useMachineDefaultValues(machine, customer)

    useLayoutEffect(() => {
        dispatch(setCustomerDialog(false))
        dispatch(setMachineDialog(false))
        dispatch(setMachineSiteDialog(false))
        dispatch(getSoftwareVersion(machineId, user?.customer))
        dispatch(getMachine(machineId, user?.customer))
        dispatch(getMachines(null, null, false, null, user?.customer))
        return () => {
            dispatch(resetMachine())
            dispatch(resetMachines())
            dispatch(resetSoftwareVersion())
            dispatch(resetConnectedMachineDialog())
            dispatch(resetMachineSiteDialogData())
        }
    }, [dispatch, machineId])

    return (
        <MotionLazyContainer display={FLEX.FLEX}>
            <Grid container rowGap={2} flexDirection={FLEX_DIR.COLUMN}>
                <Grid item xs={12} sm={12} lg={6}>
                    <Autocomplete
                        value={machine}
                        options={machines}
                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        getOptionLabel={option => `${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}
                        renderOption={(props, option) => <li {...props} key={option?._id}>{`${option.serialNo || ''} ${option?.name ? '-' : ''} ${option?.name || ''}`}</li>}
                        onChange={(e, newValue) => {
                            navigate(PATH_MACHINE.machines.view(newValue?._id))
                        }}
                        renderInput={(params) => <TextField label="Machine" {...params} />}
                    />
                </Grid>
                <MachineNav isLoading={isLoading} machineData={defaultValues} />
                <Outlet />
            </Grid>
            {customerDialog && <CustomerDialog />}
            {machineSiteDialogData && <SiteDialog />}
            {connectedMachineDialog && <MachineDialog />}
        </MotionLazyContainer>
    )
}

MachineModuleLayout.propTypes = {
    children: PropTypes.node
}

export default memo(MachineModuleLayout)
