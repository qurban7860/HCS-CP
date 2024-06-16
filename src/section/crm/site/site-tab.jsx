import { useState, useEffect, useMemo, memo } from 'react'
import { useParams } from 'react-router-dom'
import { dispatch, useSelector } from 'store'
import { useSettingContext, useFilter, useTable, getComparator, ICON_NAME } from 'hook'
import {
  getCustomer,
  getSite,
  getSites,
  setFromSiteDialog,
  setSelectedSiteCard,
  setValidCoordinates,
  setSiteFilterBy,
  ChangeSitePage,
  resetSites,
  resetSite,
  resetSelectedSiteCard,
  resetValidCoordinates
} from 'store/slice'
import { Divider, Grid, Card, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GCardOption, GStyledTopBorderDivider, GStyledFlexEndBox, GStyledSiteMapBox, GStyledSpanBox } from 'theme/style'
import {
  MotionLazyContainer,
  GridViewTitle,
  GridViewField,
  AuditBox,
  CustomerDialog,
  SearchBox,
  GoogleMaps,
  NothingProvided,
  IconTooltip
} from 'component'
import { SiteCard, siteDefaultValues } from 'section/crm/site'
import { MARGIN } from 'config'
import { KEY, TITLE, FLEX, TYPOGRAPHY, SNACK, FLEX_DIR, LABEL, VARIANT, ADDRESS, VIEW_FORM, CUSTOMER } from 'constant'

const SiteTab = () => {
  const { id } = useParams()
  const { site, sites, initial, isLoading, selectedSiteCard, fromSiteDialog, validCoordinates } = useSelector((state) => state.site)
  const { customer, customerDialog } = useSelector((state) => state.customer)

  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const { order, orderBy } = useTable({
    defaultOrderBy: KEY.CREATED_AT,
    defaultOrder: KEY.DESC
  })

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id))
      dispatch(getSites(id, customer?.isArchived))
      dispatch(setFromSiteDialog(false))
    }
  }, [id, dispatch])

  const defaultValues = siteDefaultValues(site, customer)
  const isMain = (s) => defaultValues?.customerMainSiteId === s?._id

  useEffect(() => {
    if (sites.length > 0 && !fromSiteDialog) {
      dispatch(resetSelectedSiteCard())
      dispatch(resetValidCoordinates())
      dispatch(getSite(id, sites[0]?._id))
      dispatch(setSelectedSiteCard(sites[0]?._id))
    }
  }, [dispatch, sites])

  useEffect(() => {
    if (sites.length > 0 && fromSiteDialog) {
      console.log('selectedSiteCard', selectedSiteCard)
      dispatch(getSite(id, selectedSiteCard))
      dispatch(setSelectedSiteCard(selectedSiteCard))
    }
  }, [dispatch, sites])

  const { filterName, handleFilterName, filteredData } = useFilter(getComparator(order, orderBy), sites, initial, ChangeSitePage, setSiteFilterBy)

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
    dispatch(resetValidCoordinates())
  }, [])

  useEffect(() => {
    if (defaultValues?.lat && defaultValues?.long) {
      dispatch(setValidCoordinates(true))
    }
  }, [defaultValues])

  const handleSiteCard = (event, siteId) => {
    event.preventDefault()
    console.log('selectedSiteCard handle', selectedSiteCard)
    dispatch(setSelectedSiteCard(siteId))
    dispatch(resetSite())
    dispatch(getSite(id, siteId))
  }

  return (
    <MotionLazyContainer display={FLEX.FLEX}>
      {/*  TODO: Make responsive */}
      <Grid container spacing={2} flexDirection={FLEX_DIR.COLUMN} {...MARGIN.PAGE_PROP}>
        <Grid item xs={12} sm={12} sx={{ overflow: KEY.AUTO, scrollBehavior: 'smooth' }}>
          <Grid container gap={2}>
            <Grid item lg={12} sm={12}>
              {siteDefaultValues.length >= 5 && (
                <Grid item sm={12} pb={2}>
                  <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} mt={0} />
                </Grid>
              )}
              <Grid container gap={2} p={1} height={100}>
                {sites?.length > 0 ? (
                  filteredData.map((s, index) => (
                    <SiteCard
                      key={index}
                      selectedCardId={selectedSiteCard || index}
                      value={defaultValues}
                      handleSiteCard={handleSiteCard}
                      isMain={isMain(s)}
                      s={s}
                    />
                  ))
                ) : (
                  <Typography variant={TYPOGRAPHY.OVERLINE1} color="text.no">
                    {LABEL.NO_SITE_FOUND}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} lg={12}>
          <Grid container>
            <Grid item sm={12}>
              <Card {...GCardOption}>
                <GStyledTopBorderDivider mode={themeMode} />
                <Grid container px={1}>
                  <Grid item lg={12}>
                    <GridViewTitle title={TITLE.SITE_INFO} />
                    <Divider variant={VARIANT.MIDDLE} style={{ width: '100%', marginBottom: 5 }} />
                  </Grid>
                  <Grid item lg={12} sm={12}>
                    <Grid container flexDirection={FLEX_DIR.ROW}>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={1} p={2}>
                          <GridViewField
                            variant={TYPOGRAPHY.H2}
                            heading={''}
                            isLoading={isLoading}
                            children={defaultValues?.name}
                            gridSize={12}
                            noBreakSpace
                            isNoBg
                          />
                          <Grid item xs={12} sm={12}>
                            <GStyledSpanBox>
                              {defaultValues?.isActive ? (
                                <IconTooltip
                                  title={LABEL.ACTIVE}
                                  icon={ICON_NAME.ACTIVE}
                                  color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
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
                                  dimension={20}
                                  iconOnly
                                />
                              )}
                            </GStyledSpanBox>
                          </Grid>
                          <GridViewField heading={VIEW_FORM.PHONE_NUMBERS} isLoading={isLoading} phoneChips={defaultValues?.phone} isNoBg />
                          <GridViewField
                            heading={VIEW_FORM.WEBSITE}
                            isLoading={isLoading}
                            link={defaultValues?.website}
                            variant={TYPOGRAPHY.BODY2}
                            gridSize={12}
                            isNoBg
                          />
                          <GridViewField heading={ADDRESS.LONG} isLoading={isLoading} children={defaultValues?.long} isNoBg />
                          <GridViewField heading={ADDRESS.LAT} isLoading={isLoading} children={defaultValues?.lat} isNoBg />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={1} p={2} flexDirection={FLEX_DIR.ROW_REVERSE}>
                          <GridViewField
                            heading={CUSTOMER.PRIMARY_BILLING_CONTACT}
                            isLoading={isLoading}
                            primaryContact={defaultValues?.primaryBillingContactFullName}
                          />
                          <GridViewField
                            heading={CUSTOMER.PRIMARY_TECHNICAL_CONTACT}
                            isLoading={isLoading}
                            primaryContact={defaultValues?.primaryTechnicalContactFullName}
                          />
                          <GridViewField heading={ADDRESS.CITY} isLoading={isLoading} children={defaultValues?.city} />
                          <GridViewField heading={ADDRESS.STREET} isLoading={isLoading} children={defaultValues?.street} />
                          <GridViewField heading={ADDRESS.REGION} isLoading={isLoading} children={defaultValues?.region} />
                          <GridViewField heading={ADDRESS.POST_CODE} isLoading={isLoading} children={defaultValues?.postCode} />
                          <GridViewField heading={ADDRESS.COUNTRY} isLoading={isLoading} children={defaultValues?.country} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={12} p={3}>
                  <GStyledSiteMapBox>
                    {validCoordinates ? (
                      <GoogleMaps machineView latlongArr={latLong} mapHeight={500} />
                    ) : (
                      <NothingProvided content={SNACK.NO_COORIDNATES} />
                    )}
                  </GStyledSiteMapBox>
                </Grid>

                <Grid item sm={12} p={2}>
                  <GStyledFlexEndBox>
                    <AuditBox value={defaultValues} />
                  </GStyledFlexEndBox>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {customerDialog && <CustomerDialog />}
    </MotionLazyContainer>
  )
}

export default memo(SiteTab)
