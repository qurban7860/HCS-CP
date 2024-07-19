import { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import { useParams, useNavigate } from 'react-router-dom'
import { ICON_NAME, useSettingContext } from 'hook'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PATH_MACHINE } from 'route/path'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  setDecoilerIcon,
  getMachineModels,
  getMachineTickets,
  resetDecoilerIcon,
  getCustomer,
  getMachine,
  setCustomerDialog,
  setMachineDialog,
  setMachineSiteDialog,
  resetCustomer,
  resetConnectedMachineDialog,
  resetMachineSiteDialogData
} from 'store/slice'
import { machineDefaultValues, TicketsTab } from 'section/product'
import { MotionLazyContainer, CustomerDialog, MachineDialog, SiteDialog } from 'component'
import { VIEW_FORM, VARIANT, FLEX, DECOILER } from 'constant'
import { MachineNav, MachineTab } from 'section/product/machine'

const { ONE_HALF_T, THREE_T, FIVE_T, SIX_T } = DECOILER

const MachineLayout = ({ tab = 0 }) => {
  const [renderedTab, setRenderedTab] = useState(tab)
  const { id } = useParams()
  const navigate = useNavigate()
  const { machine, isLoading, connectedMachineDialog, machineSiteDialogData } = useSelector((state) => state.machine)
  const { customer, customerDialog } = useSelector((state) => state.customer)
  const { machineTickets } = useSelector((state) => state.machineTicket)

  useEffect(() => {
    dispatch(getMachine(id))
    dispatch(getMachineTickets(machine.serialNo))
  }, [id])

  useEffect(() => {
    if (machine?.customer) {
      dispatch(getCustomer(machine?.customer._id))
    }
  }, [dispatch, machine?.customer])

  useEffect(() => {
    dispatch(setCustomerDialog(false))
    dispatch(setMachineDialog(false))
    dispatch(setMachineSiteDialog(false))
    dispatch(resetCustomer())
    dispatch(resetConnectedMachineDialog())
    dispatch(resetMachineSiteDialogData())
  }, [dispatch])

  const defaultValues = machineDefaultValues(machine, customer, machineTickets)

  useEffect(() => {
    dispatch(getMachineModels())
    if (defaultValues?.machineModel?.includes(ONE_HALF_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_1_5T))
    }

    if (defaultValues?.machineModel?.includes(THREE_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_3T))
    }

    if (defaultValues?.machineModel?.includes(FIVE_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_1_5T))
    }

    if (defaultValues?.machineModel?.includes(SIX_T.toUpperCase())) {
      dispatch(setDecoilerIcon(ICON_NAME.DECOILER_1_5T))
    }

    return () => {
      // dispatch(resetMachineModels())
      dispatch(resetDecoilerIcon())
    }
  }, [dispatch, defaultValues?.machineModel])

  const navigatePage = (tab) => {
    if (tab === 0 && id) {
      navigate(PATH_MACHINE.machines.view(id))
      // dispatch(setFromDialog(false))
      // dispatch(setFromSiteDialog(false))
    } else if (tab === 1 && id) {
      // navigate(PATH_CUSTOMER.customers.contacts.view(id))
      // dispatch(setFromDialog(false))
      // dispatch(setFromSiteDialog(false))
    } else if (tab === 2 && id) {
      // navigate(PATH_CUSTOMER.customers.sites.view(id))
      // dispatch(setFromDialog(false))
      // dispatch(setFromSiteDialog(false))
    } else if (tab === 6 && id) {
      navigate(PATH_MACHINE.machines.support.list(id))
    }
  }

  // TODO: #HPS-1062 when JIRA api integated, replace this mock data

  return (
    <MotionLazyContainer display={FLEX.FLEX}>
      {/*  TODO: HPS-1240 Make responsive */}
      <MachineNav renderedTab={renderedTab} navigatePage={navigatePage} isLoading={isLoading} value={defaultValues} />
      {renderedTab === 0 ? (
        <MachineTab />
      ) : renderedTab === 1 ? (
        <Typography variant="h0">{'LICENSE PAGE'}</Typography>
      ) : renderedTab === 2 ? (
        <Typography variant="h0">{'TOOLS PAGE'}</Typography>
      ) : renderedTab === 3 ? (
        <Typography variant="h0">{'PROFILES PAGE'}</Typography>
      ) : renderedTab === 4 ? (
        <Typography variant="h0">{'SETTINGS PAGE'}</Typography>
      ) : renderedTab === 5 ? (
        <Typography variant="h0">{'SERVICE RECORDS PAGE'}</Typography>
      ) : renderedTab === 6 ? (
        <TicketsTab />
      ) : null}
      {customerDialog && <CustomerDialog />}
      {machineSiteDialogData && <SiteDialog />}
      {connectedMachineDialog && <MachineDialog />}
    </MotionLazyContainer>
  )
}

MachineLayout.propTypes = {
  machine: PropTypes.array
}

export default memo(MachineLayout)
