import { Fragment, useEffect, useCallback, useLayoutEffect } from 'react'
import { t } from 'i18next'
import { useSelector, dispatch } from 'store'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import { useAuthContext } from 'auth/use-auth-context'
import {
    getMachines,
    getCustomer,
    getContact,
    getContacts,
    getSites,
    getMachine,
    setContactDialog,
    setMachineDialog,
    setMachineSiteDialog,
    resetCustomerMachines,
    resetContact,
    resetMachine,
    resetMachines
} from 'store/slice'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { ContactListCard, MachineListCard } from 'section/home'
import { HowickResources, CommonFieldsCard } from 'section/common'
import { useCustomerDefaultValues } from 'section/crm/customer'
import { useTheme, Grid, Link } from '@mui/material'
import { AuditBox, SiteCarousel, ChowBox, MachineDialog, SiteDialog, ContactDialog } from 'component'
import { GStyledBottomScrollableHeightLockGrid, GStyledIconLoadingButton } from 'theme/style'
import { MARGIN, SPACING, ICON } from 'config/layout'
import { FLEX_DIR } from 'constant'
import { PATH_SUPPORT } from 'route/path'

const HomeTab = () => {
    const { machines, machineTotalCount, customer, isLoading, sites, contact, contacts } = useSelector(
        state => ({
            machines: state.machine.machines,
            machineTotalCount: state.machine.machineTotalCount,
            customer: state.customer.customer,
            isLoading: state.customer.isLoading,
            sites: state.site.sites,
            contact: state.contact.contact,
            contacts: state.contact.contacts
        }),
        _.isEqual
    )

    const { user } = useAuthContext()
    const { themeMode } = useSettingContext()
    const theme = useTheme()
    const customerId = user?.customer

    useEffect(() => {
        const debounceFetch = debounce(() => {
            if (customerId !== customer?._id) dispatch(getCustomer(customerId))
        }, 300)
        debounceFetch()
        return () => debounceFetch.cancel()
    }, [customerId, customer])

    useEffect(() => {
        const debounceFetch = debounce(() => {
            if (customerId && !sites.length) {
                dispatch(getSites(customerId, customer?.isArchived))
            }
        }, 300)
        debounceFetch()
        return () => debounceFetch.cancel()
    }, [customerId, sites?.length, dispatch])

    useEffect(() => {
        const debouncedDispatch = _.debounce(() => {
            if (!machines?.length && customer?._id) {
                dispatch(getMachines(null, null, false, null, customer?._id))
            }
        }, 300)
        debouncedDispatch()
        return () => debouncedDispatch.cancel()
    }, [dispatch, machines?.length, customer?._id])

    useEffect(() => {
        const debounceFetch = debounce(() => {
            if (customerId && !contacts.length) dispatch(getContacts(customerId))
        }, 300)
        debounceFetch()
        return () => debounceFetch.cancel()
    }, [customerId, contacts, dispatch])

    const defaultValues = useCustomerDefaultValues(customer, machines, contacts)
    const isMain = useCallback(s => defaultValues?.customerMainSiteId === s?._id, [defaultValues])

    const handleContactDialog = contactId => {
        dispatch(getContact(customerId, contactId))
        dispatch(setContactDialog(true))
    }

    const handleMachineDialog = (event, machineId) => {
        event.preventDefault()
        dispatch(resetMachine())
        dispatch(getMachine(machineId, customer?._id))
        dispatch(setMachineDialog(true))
    }

    useLayoutEffect(() => {
        dispatch(setMachineDialog(false))
        dispatch(setMachineSiteDialog(false))
        dispatch(setContactDialog(false))
        dispatch(resetMachines())
        dispatch(resetContact())
    }, [dispatch])

    return (
        <Fragment>
            <Grid container columnSpacing={SPACING.COLUMN_SPACING} flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
                <Grid item sm={12} lg={12}>
                    {/* <Grid container rowGap={2} columnSpacing={2} mb={2} display={'flex'} justifyContent={'flex-end'}>
        <Grid item md={3} display={'flex'} justifyContent={'flex-end'} mx={2}>
             <GStyledIconLoadingButton
                loading={isLoading}
                type={'button'}
                mode={themeMode}
                textColor={theme.palette.common.white}
                bgColor={theme.palette.howick.midBlue}>
                <Link href={PATH_SUPPORT.tickets.create} underline={'none'} color={'inherit'} sx={{ alignItems: 'center', display: 'flex' }}>
                    <Icon icon={ICON_NAME.ADD} sx={{...ICON.SIZE_XS }}/>&nbsp;{t('create_support_ticket.label').toUpperCase()}
                </Link>
            </GStyledIconLoadingButton>
        </Grid>
    </Grid> */}
                </Grid>
                <Grid item sm={12} lg={12}>
                    <ChowBox title={sites?.length > 1 ? t('site.sites.label') : t('site.label')}>
                        <SiteCarousel sites={sites} theme={theme} themeMode={themeMode} isMain={isMain} />
                    </ChowBox>
                    <Grid container rowGap={2} columnSpacing={2} mb={2}>
                        <Grid item xs={12} sm={6}>
                            <GStyledBottomScrollableHeightLockGrid mode={themeMode} totalCount={contacts?.length}>
                                <ContactListCard value={defaultValues} handleContactDialog={handleContactDialog} />
                            </GStyledBottomScrollableHeightLockGrid>
                        </Grid>
                        <Grid item xs={12} sm={6} mb={5}>
                            <GStyledBottomScrollableHeightLockGrid mode={themeMode} totalCount={machineTotalCount}>
                                <MachineListCard className='machines-widget' handleMachineDialog={handleMachineDialog} machineTotalCount={machineTotalCount} />
                            </GStyledBottomScrollableHeightLockGrid>
                        </Grid>
                    </Grid>
                    {/* <CommonFieldsCard isChildren i18nKey={'howick_resources.label'} defaultValues={defaultValues} isLoading={isLoading}>
      <HowickResources value={defaultValues} isLoading={isLoading} gridSize={4} />
     </CommonFieldsCard> */}
                </Grid>
                <MachineDialog />
                <SiteDialog />
                <ContactDialog contact={contact} />
            </Grid>
            {/* <AuditBox value={defaultValues} /> */}
        </Fragment>
    )
}

export default HomeTab
