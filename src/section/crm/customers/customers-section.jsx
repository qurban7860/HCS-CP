import { useEffect, useLayoutEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector, dispatch } from 'store'
import axios from 'axios'
import _ from 'lodash'
import { useSettingContext, useTable, useFilter, getComparator } from 'hook'
import { Table, Typography, Grid } from '@mui/material'
import { GStyledTableHeaderBox, GStyledSpanBox } from 'theme/style'
import { getCustomers, resetCustomers, ChangeCustomerPage, ChangeCustomerRowsPerPage, setCustomerFilterBy } from 'store/slice'
import { MotionLazyContainer } from 'component/animate'
import { SearchBox } from 'component/search'
import { TableNoData } from 'component'
import { SkeletonTable } from 'component/skeleton'
import { CustomerTable, CustomerHeader, CustomerListPagination } from 'section/crm'
import { MARGIN, TABLE } from 'config'
import { KEY, VARIANT, FLEX_DIR, FLEX } from 'constant'
import { StyledScrollTableContainer } from './style'

const { TYPOGRAPHY } = VARIANT

const CustomerListSection = ({ isArchived }) => {
 const { customers, initial, isLoading, customerPage, customerRowsPerPage } = useSelector(state => state.customer)
 const { themeMode } = useSettingContext()
 const denseHeight = TABLE.DENSE_HEIGHT

 const axiosToken = () => axios.CancelToken.source()
 const cancelTokenSource = axiosToken()

 const {
  order,
  orderBy,
  setPage: setTablePage
 } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: KEY.DESC
 })

 useLayoutEffect(() => {
  dispatch(resetCustomers())
 }, [dispatch])

 const { filterName, handleFilterName, filteredData } = useFilter(getComparator(order, orderBy), customers, initial, ChangeCustomerPage, setCustomerFilterBy)

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   dispatch(getCustomers(null, null, isArchived, cancelTokenSource))
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [dispatch])

 const handleChangePage = (event, newPage) => {
  if (newPage < Math.ceil(filteredData.length / customerRowsPerPage)) {
   dispatch(ChangeCustomerPage(newPage))
  }
 }

 const handleChangeRowsPerPage = event => {
  dispatch(ChangeCustomerPage(0))
  dispatch(ChangeCustomerRowsPerPage(parseInt(event.target.value, 10)))
 }
 const isNotFound = !isLoading && !filteredData.length

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   <GStyledSpanBox>
    <Typography variant={TYPOGRAPHY.H3} color={themeMode === KEY.LIGHT ? 'grey.200' : 'howick.bronze'}>
     {/* TODO: 1511, Refactor Customer List as Switch Organization/Business */}
     {/* {t('group.label').toUpperCase()}y */}
    </Typography>
   </GStyledSpanBox>
   <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} />
   <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
    <Grid item lg={12}>
     <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor='background.paper'>
       <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
       <CustomerListPagination
        mode={themeMode}
        data={filteredData}
        page={customerPage}
        rowsPerPage={customerRowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
       />
       <StyledScrollTableContainer>
        <Table>
         <CustomerHeader mode={themeMode} />
         {(isLoading ? [...Array(customerRowsPerPage)] : filteredData)
          .slice(customerPage * customerRowsPerPage, customerPage * customerRowsPerPage + customerRowsPerPage)
          .map((row, index) => (row ? <CustomerTable key={row._id} customer={row} mode={themeMode} index={index} /> : !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />))}
         <TableNoData isNotFound={isNotFound} />
        </Table>
       </StyledScrollTableContainer>
      </Grid>
     </Grid>
    </Grid>
   </Grid>
  </MotionLazyContainer>
 )
}

CustomerListSection.propTypes = {
 isArchived: PropTypes.bool
}

export default memo(CustomerListSection)
