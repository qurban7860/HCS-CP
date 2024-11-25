import { useEffect, useState, memo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'
import { t } from 'i18next'
import { useAuthContext } from 'auth'
import { useSelector, dispatch } from 'store'
import { useNavigate } from 'react-router-dom'
import { useTable, useFilter, getComparator, useSettingContext, useResponsive } from 'hook'
import { PATH_MACHINE } from 'route/path'
import {
 getMachine,
 getMachines,
 getSecurityUser,
 setMachineFilterBy,
 setSelectedMachineCard,
 ChangeMachinePage,
 ChangeMachineRowsPerPage,
 resetMachine,
 resetMachines,
 resetSecurityUser,
 resetSelectedContactCard
} from 'store/slice'
import { Table, Grid, Typography } from '@mui/material'
import { GStyledTableHeaderBox } from 'theme/style'
import { TableNoData, MotionLazyContainer, SkeletonTable, SearchBox, TableTitleBox } from 'component'
import { MachineTable, MachineHeader, MachineListPagination, MachineCard } from 'section/product'
import { MARGIN, TABLE } from 'config'
import { KEY, TITLE, FLEX, FLEX_DIR, LABEL, TYPOGRAPHY } from 'constant'
import { StyledScrollTableContainer } from './style'

const MachineListSection = ({ isArchived }) => {
 const [tableData, setTableData] = useState([])
 const { machines, selectedMachineCard, initial, isLoading, machinePage, machineRowsPerPage } = useSelector(state => state.machine)
 const { securityUser } = useSelector(state => state.user)
 const { userId } = useAuthContext()

 const isMobile = useResponsive('down', 'sm')

 const navigate = useNavigate()
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
  dispatch(resetMachine())
  dispatch(resetMachines())
  dispatch(resetSelectedContactCard())

  if (userId !== securityUser?._id) {
   dispatch(resetSecurityUser())
  }
 }, [userId])

 useEffect(() => {
  if (userId !== securityUser?._id) {
   dispatch(getSecurityUser(userId))
  }
 }, [userId])

 useEffect(() => {
  const debouncedDispatch = _.debounce(() => {
   dispatch(getMachines(null, null, false, cancelTokenSource))
  }, 300)
  debouncedDispatch()
  return () => debouncedDispatch.cancel()
 }, [dispatch, machinePage, machineRowsPerPage])

 useEffect(() => {
  if (initial) {
   setTableData(machines || [])
  }
 }, [machines, initial])

 const { filterName, handleFilterName, filteredData } = useFilter(getComparator(order, orderBy), tableData, initial, ChangeMachinePage, setMachineFilterBy)

 const handleChangePage = (event, newPage) => {
  if (newPage < Math.ceil(filteredData.length / machineRowsPerPage)) {
   dispatch(ChangeMachinePage(newPage))
  }
 }

 const handleChangeRowsPerPage = event => {
  dispatch(ChangeMachinePage(0))
  dispatch(ChangeMachineRowsPerPage(parseInt(event.target.value, 10)))
 }

 const handleSelectedCard = (event, id) => {
  event.preventDefault()
  //    dispatch(resetMachine())
  dispatch(setSelectedMachineCard(id))
 }

 const handleMachineCard = (event, id) => {
  event.preventDefault()
  dispatch(setSelectedMachineCard(id))
  dispatch(resetMachine())
  dispatch(getMachine(id))
  const url = PATH_MACHINE.machines.view(id)
  navigate(url)
 }

 const handleMachineInNewTabCard = (event, id) => {
  event.preventDefault()
  dispatch(setSelectedMachineCard(id))
  dispatch(resetMachine())
  dispatch(getMachine(id))
  const url = PATH_MACHINE.machines.view(id)
  window.open(url, KEY.BLANK)
 }

 const isNotFound = !isLoading && !filteredData.length

 return (
  <MotionLazyContainer display={FLEX.FLEX}>
   <TableTitleBox title={TITLE.MACHINE_LIST} user={securityUser} />
   <SearchBox term={filterName} mode={themeMode} handleSearch={handleFilterName} />
   {isMobile ? (
    <Grid container flexDirection={FLEX_DIR.ROW} {...MARGIN.PAGE_PROP}>
     <Grid item xs={12} sm={12}>
      <Grid container mb={2}>
       <Grid item xs={12} sm={12} mb={2} bgcolor='transparent'>
        <Grid container p={1}>
         {machines?.length > 0 ? (
          filteredData.map((cmach, index) => (
           <MachineCard
            key={index}
            selectedCardId={selectedMachineCard || index}
            machine={cmach}
            handleSelected={handleSelectedCard}
            handleMachineCard={handleMachineCard}
            handleMachineInNewTabCard={handleMachineInNewTabCard}
           />
          ))
         ) : (
          <Typography variant={TYPOGRAPHY.OVERLINE1} color='text.no'>
           {t('no_machine_found.label')}
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
        <MachineListPagination
         mode={themeMode}
         data={filteredData}
         page={machinePage}
         rowsPerPage={machineRowsPerPage}
         handleChangePage={handleChangePage}
         handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <StyledScrollTableContainer>
         <Table>
          <MachineHeader mode={themeMode} />
          {(isLoading ? [...Array(machineRowsPerPage)] : filteredData)
           .slice(machinePage * machineRowsPerPage, machinePage * machineRowsPerPage + machineRowsPerPage)
           .map((row, index) =>
            row ? <MachineTable key={row._id} machine={row} mode={themeMode} index={index} isArchived={isArchived} /> : !isNotFound && <SkeletonTable key={index} sx={{ height: denseHeight }} />
           )}
          <TableNoData isNotFound={isNotFound} />
         </Table>
        </StyledScrollTableContainer>
       </Grid>
      </Grid>
     </Grid>
    </Grid>
   )}
  </MotionLazyContainer>
 )
}

MachineListSection.propTypes = {
 isArchived: PropTypes.bool
}

export default memo(MachineListSection)
