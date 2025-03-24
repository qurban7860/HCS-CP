import { Fragment, useEffect, useMemo, memo, useLayoutEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import debounce from 'lodash/debounce'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useTempFilter, useTable, getComparator, ICON_NAME } from 'hook'
import {
 getCustomer,
 getSite,
 getSites,
 setFromSiteDialog,
 setSelectedSiteCard,
 setValidCoordinates,
 setSiteFilterBy,
 ChangeSitePage,
 resetSite,
 resetSelectedSiteCard,
 resetValidCoordinates
} from 'store/slice'
import { useSiteDefaultValues, fieldsSiteConfig } from 'section/crm/site'
import { SiteCard } from 'section/home'
import { CommonFieldsContainer } from 'section/common'
import { useMediaQuery, Grid, Card, Typography } from '@mui/material'
import { GridViewTitle, GridViewField, AuditBox, CustomerDialog, SearchBox, GoogleMaps, NothingProvided, IconTooltip, DropdownDefault } from 'component'
import { useTheme } from '@mui/material/styles'
import { GCardOption, GStyledTopBorderDivider, GStyledSiteMapBox, GStyledSpanBox } from 'theme/style'
import { truncate } from 'util'
import { MARGIN, SPACING } from 'config/layout'
import { KEY, TYPOGRAPHY, FLEX_DIR, LABEL } from 'constant'

const SiteTab = () => {
 const { site, sites, initial, isLoading, selectedSiteCard, fromSiteDialog, validCoordinates } = useSelector(state => state.site)
 const { customer, customerDialog } = useSelector(state => state.customer)
 const { id } = useParams()
 const { themeMode } = useSettingContext()
 const theme = useTheme()
 const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
 const { order, orderBy } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: KEY.DESC
 })

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (id !== customer?._id) {
    dispatch(getCustomer(id))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [id, dispatch])

 useEffect(() => {
  const debouceFetch = _.debounce(() => {
   if (id && !sites.length) {
    dispatch(getSites(id, customer?.isArchived))
   }
  }, 300)
  debouceFetch()
  return () => debouceFetch.cancel()
 }, [id, sites, dispatch])

 useEffect(() => {
  const debouceFetch = debounce(() => {
   if (sites.length && !fromSiteDialog) {
    dispatch(resetSelectedSiteCard())
    dispatch(resetValidCoordinates())
    dispatch(getSite(id, sites[0]?._id))
    dispatch(setSelectedSiteCard(sites[0]?._id))
   }
  }, 300)
  debouceFetch()
  return () => debouceFetch.cancel()
 }, [dispatch, sites])

 useEffect(() => {
  const debouceFetch = debounce(() => {
   if (sites.length > 0 && fromSiteDialog) {
    dispatch(getSite(id, selectedSiteCard))
    dispatch(setSelectedSiteCard(selectedSiteCard))
   }
  }, 300)
  debouceFetch()
  return () => debouceFetch.cancel()
 }, [dispatch, sites])

 const defaultValues = useSiteDefaultValues(site, customer)
 const isMain = useCallback(s => defaultValues?.customerMainSiteId === s?._id, [defaultValues])
 const { filterName, handleFilterName, filteredData } = useTempFilter(getComparator(order, orderBy), sites, initial, ChangeSitePage, setSiteFilterBy)

 const latLong = useMemo(
  () => [
   {
    lat: defaultValues?.lat || '',
    long: defaultValues?.long || ''
   }
  ],
  [defaultValues]
 )

 useEffect(() => {
  if (latLong[0].lat !== '' && latLong[0].long !== '') {
   dispatch(setValidCoordinates(true))
  } else {
   dispatch(setValidCoordinates(false))
  }
 }, [dispatch, latLong])

 const handleSiteCard = (event, siteId) => {
  event.preventDefault()
  dispatch(setSelectedSiteCard(siteId))
  dispatch(resetSite())
  dispatch(getSite(id, siteId))
 }

 const renderDesktopView = () =>
  filteredData.map((site, index) => <SiteCard key={index} selectedCardId={selectedSiteCard || index} value={defaultValues} handleSiteCard={handleSiteCard} isMain={isMain(site)} site={site} />)

 const renderMobileView = () => (
  <DropdownDefault
   renderLabel={item => `${item?.name}`}
   valueKey={'_id'}
   keyExtractor={item => item._id}
   filteredData={filteredData}
   selectedCard={selectedSiteCard}
   i18nKey={'site.sites.label'}
   onChange={e => handleSiteCard(e, e.target.value)}
  />
 )

 const renderNoSite = () => (
  <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.secondary' align='center' sx={{ mt: 2 }}>
   <Trans i18nKey='no_found.label' values={{ value: 'site' }} />
  </Typography>
 )

 const renderList = () => {
  if (sites?.length > 0) {
   return isDesktop ? renderDesktopView() : renderMobileView()
  } else {
   return renderNoSite()
  }
 }

 const renderIcons = () => {
  return (
   <Grid item xs={12} sm={12} sx={{ m: 2 }}>
    <GStyledSpanBox>
     {defaultValues?.isActive ? (
      <IconTooltip
       title={LABEL.ACTIVE}
       icon={ICON_NAME.ACTIVE}
       color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
       tooltipColor={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
       isActiveIcon
       iconOnly
      />
     ) : (
      <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} />
     )}
     {isMain(site) && (
      <IconTooltip
       title={LABEL.MAIN_SITE}
       icon={ICON_NAME.MAIN_SITE}
       color={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}
       tooltipColor={themeMode === KEY.LIGHT ? theme.palette.howick.darkBlue : theme.palette.howick.orange}
       dimension={20}
       iconOnly
      />
     )}
     <GridViewField variant={isDesktop ? TYPOGRAPHY.H2 : TYPOGRAPHY.H5} heading={''} isLoading={isLoading} gridSize={12} noBreakSpace isNoBg>
      {truncate(defaultValues?.name, 40)}
     </GridViewField>
    </GStyledSpanBox>
   </Grid>
  )
 }

 useLayoutEffect(() => {
  dispatch(setFromSiteDialog(false))
  dispatch(resetSite())
 }, [dispatch])

 return (
  <Fragment>
   <Grid container columnSpacing={SPACING.COLUMN_SPACING} flexDirection={FLEX_DIR.COLUMN} {...MARGIN.PAGE_PROP}>
    <Grid item xs={12} sm={12} mb={isDesktop && 2}>
     <Grid container gap={2}>
      <Grid item xs={12} md={12}>
       {sites.length >= 5 && (
        <Grid item xs={12}>
         <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
        </Grid>
       )}
       <Grid container gap={2} p={1} height={isDesktop ? 100 : 'auto'}>
        {renderList()}
       </Grid>
      </Grid>
     </Grid>
    </Grid>
    <Grid item xs={12} md={12}>
     <Grid container>
      <Grid item sm={12}>
       <Card {...GCardOption(themeMode)}>
        <GStyledTopBorderDivider mode={themeMode} />
        <Grid container px={1}>
         <Grid item lg={12}>
          <GridViewTitle title={t('site_information.label')} />
         </Grid>
         <Grid item lg={12} sm={12}>
          <Grid container flexDirection={FLEX_DIR.ROW}>
           {renderIcons()}
           <CommonFieldsContainer defaultValues={defaultValues} fieldsConfig={fieldsSiteConfig} isLoading={isLoading} />
          </Grid>
         </Grid>
        </Grid>
        <Grid item sm={12} p={3}>
         <GStyledSiteMapBox>{validCoordinates ? <GoogleMaps machineView latlongArr={latLong} mapHeight={500} /> : <NothingProvided content={t('no_coordinates_provided.label')} />}</GStyledSiteMapBox>
        </Grid>
       </Card>
      </Grid>
     </Grid>
    </Grid>
   </Grid>

   <AuditBox value={defaultValues} />
   {customerDialog && <CustomerDialog />}
  </Fragment>
 )
}

export default memo(SiteTab)
