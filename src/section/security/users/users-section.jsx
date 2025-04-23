import { Fragment, useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import { t } from 'i18next'
import axios from 'axios'
import { Trans } from 'react-i18next'
import { useAuthContext, useWebSocketContext } from 'auth'
import { useSelector, dispatch } from 'store'
import { useNavigate } from 'react-router-dom'
import { useTable, useFilter, getComparator, useSettingContext, useResponsive } from 'hook'
import { PATH_MACHINE, PATH_SECURITY, PATH_CUSTOMER } from 'route/path'
import {
  getSecurityUser,
  getSecurityUsers,
  getContact,
  setFromDialog,
  setUserDialog,
  setUserFilterBy,
  setSelectedUserCard,
  setSelectedContactCard,
  ChangeUserPage,
  ChangeUserRowsPerPage,
  resetSecurityUser,
  resetSecurityUsers,
  resetSelectedContactCard
} from 'store/slice'
import { Table, Grid, Typography, TableContainer } from '@mui/material'
import { GStyledTableHeaderBox } from 'theme/style'
import { TableNoData, SkeletonTable, SearchBox, TableTitleBox, UserDialog } from 'component'
import { UsersTable, UsersHeader, UsersListPagination, UsersCard, HEADER_ITEMS } from 'section/security'
import { delay } from 'util'
import { MARGIN, TABLE } from 'config'
import { KEY, FLEX_DIR, TYPOGRAPHY } from 'constant'

const UsersListSection = ({ isArchived }) => {
  const [tableData, setTableData] = useState([])
  const { securityUsers, selectedUserCard, initial, isLoading, userPage, userRowsPerPage } = useSelector(state => state.user)
  const { onlineUsers } = useWebSocketContext()
  const { user } = useAuthContext()
  const { themeMode } = useSettingContext()

  const isMobile = useResponsive('down', 'sm')
  const navigate = useNavigate()
  const denseHeight = TABLE.DENSE_HEIGHT
  const axiosToken = () => axios.CancelToken.source();
  const cancelTokenSource = axiosToken();

  const {
    order,
    orderBy,
    selected,
    onSort,
    setPage: setTablePage
  } = useTable({
    defaultOrderBy: 'isOnline',
    defaultOrder: KEY.DESC
  })



  useEffect(() => {
    dispatch(setUserDialog(false))
    dispatch(getSecurityUsers(user.customer, cancelTokenSource));
    return () => {
      cancelTokenSource.cancel();
      dispatch(resetSecurityUser());
      dispatch(resetSecurityUsers());
      dispatch(resetSelectedContactCard());
      dispatch(setUserDialog(false));
    };
  }, [dispatch])

  useEffect(() => {
    if (initial) {
      setTableData(securityUsers || [])
    }
  }, [securityUsers, initial])


  const { filterName, handleFilterName, filteredData, filterStatus, filterRole, handleFilterStatus, handleFilterRole } = useFilter(
    getComparator(order, orderBy),
    tableData,
    initial,
    ChangeUserPage,
    setUserFilterBy,
    'isOnline'
  )

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

  const handleUserDialog = (event, userId) => {
    dispatch(getSecurityUser(userId, user?.customer))
    dispatch(setUserDialog(true))
  }

  const handleMachineInNewTabCard = (event, id) => {
    event.preventDefault()
    dispatch(setSelectedUserCard(id))
    dispatch(resetSecurityUser())
    dispatch(getSecurityUser(id, user?.customer))
    const url = PATH_MACHINE.machines.view(id)
    window.open(url, KEY.BLANK)
  }

  const handleNavigateToContact = contactId => {
    dispatch(resetSelectedContactCard())
    navigate(PATH_CUSTOMER.customers.contacts.view(user.customer))
    delay(200).then(() => {
      dispatch(setFromDialog(true))
      dispatch(setSelectedContactCard(contactId))
      dispatch(getContact(user.customer, contactId))
    })
  }

  const isNotFound = !isLoading && !filteredData.length

  return (
    <Fragment>
      <TableTitleBox title={t('user.users.label')} />
      <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} />
      {isMobile ? (
        <Fragment>
          <UsersListPagination
            count={filteredData?.length || 0}
            data={filteredData}
            page={userPage}
            rowsPerPage={userRowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            columnFilterButtonData={HEADER_ITEMS}
            currentFilterStatus={filterStatus}
            handleFilterStatus={handleFilterStatus}
            currentFilterRole={filterRole}
            handleFilterRole={handleFilterRole}
            noPaginationToolbar
            showFilterStatus
            showFilterRole
          />
          <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
            <Grid item xs={12} sm={12}>
              <Grid container mb={2}>
                <Grid item xs={12} sm={12} mb={2} bgcolor='transparent'>
                  <Grid container p={1}>
                    {securityUsers?.length > 0 ? (
                      filteredData.map((user, index) => (
                        <UsersCard
                          key={index}
                          user={user}
                          selectedCardId={selectedUserCard || index}
                          handleSelected={handleSelectedCard}
                          handleUserCard={handleUserDialog}
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
        </Fragment>
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
                  currentFilterStatus={filterStatus}
                  handleFilterStatus={handleFilterStatus}
                  currentFilterRole={filterRole}
                  handleFilterRole={handleFilterRole}
                  showFilterStatus
                  showFilterRole
                />
                <TableContainer>
                  <Table>
                    <UsersHeader columns={HEADER_ITEMS} dataFiltered={filteredData} orderBy={orderBy} order={order} onSort={onSort} />
                    {(isLoading ? [...Array(userRowsPerPage)] : filteredData)
                      .slice(userPage * userRowsPerPage, userPage * userRowsPerPage + userRowsPerPage)
                      .map((row, index) =>
                        row ? (
                          <UsersTable
                            key={row._id}
                            onlineUsers={onlineUsers}
                            row={row}
                            columns={HEADER_ITEMS}
                            onViewRow={() => { }}
                            handleNameOnClick={handleUserDialog}
                            handleNavigateToContact={handleNavigateToContact}
                            mode={themeMode}
                            index={index}
                            isArchived={isArchived}
                            selected={selected.includes(row._id)}
                          />
                        ) : (
                          !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />
                        )
                      )}
                    <TableNoData isNotFound={isNotFound} />
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <UserDialog />
    </Fragment>
  )
}

UsersListSection.propTypes = {
  isArchived: PropTypes.bool
}

export default memo(UsersListSection)
