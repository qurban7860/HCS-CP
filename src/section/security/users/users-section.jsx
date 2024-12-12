import { Fragment, useEffect, useState, memo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import axios from 'axios'
import _ from 'lodash'
import { debounce } from 'lodash'
import { Trans } from 'react-i18next'
import { useAuthContext } from 'auth'
import { useSelector, dispatch } from 'store'
import { useNavigate } from 'react-router-dom'
import { useTable, useFilter, getComparator, useSettingContext, useResponsive } from 'hook'
import { PATH_MACHINE, PATH_SECURITY } from 'route/path'
import {
 getSecurityUser,
 getSecurityUsers,
 setUserFilterBy,
 setSelectedUserCard,
 ChangeUserPage,
 ChangeUserRowsPerPage,
 resetSecurityUser,
 resetSecurityUsers,
 resetSelectedUserCard,
 resetSelectedContactCard
} from 'store/slice'
import { Table, Grid, Typography, TableContainer } from '@mui/material'
import { GStyledTableHeaderBox } from 'theme/style'
import { TableNoData, SkeletonTable, SearchBox, TableTitleBox } from 'component'
import { UsersTable, UsersHeader, UsersListPagination, UsersCard, HEADER_ITEMS } from 'section/security'
import { MARGIN, TABLE } from 'config'
import { KEY, FLEX_DIR, TYPOGRAPHY } from 'constant'
import { applySort } from 'util'
import { StyledScrollTableContainer } from './style'

const UsersListSection = ({ isArchived }) => {
 const [tableData, setTableData] = useState([])
 const { securityUsers, selectedUserCard, initial, isLoading, userPage, userRowsPerPage } = useSelector(state => state.user)
 const { securityUser } = useSelector(state => state.user)
 const { user, userId } = useAuthContext()
 const { themeMode } = useSettingContext()
 //   const [tableColumns, dispatchTableColumns] = useReducer(tableColumnsReducer, getLogTypeConfigForGenerationAndType(5, 'ERP').tableColumns)

 const isMobile = useResponsive('down', 'sm')
 const navigate = useNavigate()
 const denseHeight = TABLE.DENSE_HEIGHT

 const axiosToken = () => axios.CancelToken.source()
 const cancelTokenSource = axiosToken()

 const {
  order,
  orderBy,
  selected,
  onSort,
  setPage: setTablePage
 } = useTable({
  defaultOrderBy: KEY.CREATED_AT,
  defaultOrder: KEY.DESC
 })

 useLayoutEffect(() => {
  dispatch(resetSecurityUser())
  dispatch(resetSecurityUsers())
  dispatch(resetSelectedContactCard())

  if (userId !== securityUser?._id) {
   dispatch(resetSecurityUser())
  }
 }, [userId])

 useEffect(() => {
  if (userId !== securityUser?._id) {
   dispatch(getSecurityUser(userId))
  }
 }, [userId, dispatch])

 useEffect(() => {
  const debounceFetch = debounce(() => {
   if (user.customer) {
    dispatch(getSecurityUsers(user.customer))
   }
  }, 300)
  debounceFetch()
  return () => debounceFetch.cancel()
 }, [dispatch, userPage, userRowsPerPage])

 useEffect(() => {
  if (initial) {
   setTableData(securityUsers || [])
  }
 }, [securityUsers, initial])

 //  const dataFiltered = applySort({
 //   inputData: tableData,
 //   comparator: getComparator(order, orderBy)
 //  })

 const { filterName, handleFilterName, filteredData } = useFilter(getComparator(order, orderBy), tableData, initial, ChangeUserPage, setUserFilterBy)

 const handleChangePage = (event, newPage) => {
  dispatch(ChangeUserPage(newPage))
 }

 const handleChangeRowsPerPage = event => {
  dispatch(ChangeUserPage(0))
  dispatch(ChangeUserRowsPerPage(parseInt(event.target.value, 10)))
 }

 const handleSelectedCard = (event, id) => {
  event.preventDefault()
  dispatch(setSelectedUserCard(id))
 }

 const handleUserCard = (event, id) => {
  event.preventDefault()
  dispatch(setSelectedUserCard(id))
  dispatch(resetSecurityUser())
  dispatch(getSecurityUser(id))
  const url = PATH_SECURITY.users.view(id)
  navigate(url)
 }

 const handleMachineInNewTabCard = (event, id) => {
  event.preventDefault()
  dispatch(setSelectedUserCard(id))
  dispatch(resetSecurityUser())
  dispatch(getSecurityUser(id))
  const url = PATH_MACHINE.machines.view(id)
  window.open(url, KEY.BLANK)
 }

 const isNotFound = !isLoading && !filteredData.length

 return (
  <Fragment>
   <TableTitleBox title={t('user.users.label')} />
   <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} />
   {isMobile ? (
    <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
     <Grid item xs={12} sm={12}>
      <Grid container mb={2}>
       <Grid item xs={12} sm={12} mb={2} bgcolor='transparent'>
        <Grid container p={1}>
         {securityUsers?.length > 0 ? (
          filteredData.map((cmach, index) => (
           <UsersCard
            key={index}
            selectedCardId={selectedUserCard || index}
            machine={cmach}
            handleSelected={handleSelectedCard}
            handleUserCard={handleUserCard}
            handleMachineInNewTabCard={handleMachineInNewTabCard}
           />
          ))
         ) : (
          <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
           <Trans i18nKey='no_found.label' values={{ value: 'Machine' }} />
          </Typography>
         )}
        </Grid>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   ) : (
    <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
     <Grid item xs={12} sm={12}>
      <Grid container mb={2}>
       <Grid item xs={12} sm={12} mb={2} bgcolor='background.paper'>
        <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
        <UsersListPagination
         count={filteredData?.length || 0}
         data={filteredData}
         page={userPage}
         rowsPerPage={userRowsPerPage}
         handleChangePage={handleChangePage}
         handleChangeRowsPerPage={handleChangeRowsPerPage}
         columnFilterButtonData={HEADER_ITEMS}
        />
        <TableContainer>
         <Table>
          <UsersHeader columns={HEADER_ITEMS} dataFiltered={filteredData} orderBy={orderBy} order={order} onSort={onSort} />
          {(isLoading ? [...Array(userRowsPerPage)] : filteredData)
           .slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage)
           .map((row, index) =>
            row ? (
             <UsersTable key={row._id} row={row} columns={HEADER_ITEMS} onViewRow={() => {}} mode={themeMode} index={index} isArchived={isArchived} selected={selected.includes(row._id)} />
            ) : (
             !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />
            )
           )}
          {/* <TableNoData isNotFound={isNotFound} /> */}
         </Table>
        </TableContainer>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   )}
  </Fragment>
 )
}

UsersListSection.propTypes = {
 isArchived: PropTypes.bool
}

export default memo(UsersListSection)
