import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'store'
import { useParams, useNavigate } from 'react-router-dom'
import { PATH_MACHINE } from 'route/path'
import { Typography } from '@mui/material'
import { machineDefaultValues, TicketsTab } from 'section/product'
import { MotionLazyContainer, CustomerDialog, MachineDialog, SiteDialog } from 'component'
import { FLEX } from 'constant'
import { MachineNav, MachineTab } from 'section/product/machine'

const MachineLayout = ({ tab = 0 }) => {
  const [renderedTab, setRenderedTab] = useState(tab)
  const { id } = useParams()
  const navigate = useNavigate()
  const { machine, isLoading, connectedMachineDialog, machineSiteDialogData } = useSelector((state) => state.machine)
  const { customer, customerDialog } = useSelector((state) => state.customer)

  const defaultValues = machineDefaultValues(machine, customer)

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
