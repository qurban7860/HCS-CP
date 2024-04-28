import { useEffect, useState } from 'react'
import { snack } from 'hook'
import { Table, Typography, Grid } from '@mui/material'
import { GStyledTableHeaderBox } from 'theme/style'
import { useGetAllMachineQuery } from 'store/slice'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { SearchBox } from 'component/search'
import { MachineTable, MachineHeader, MachineListPagination } from 'section/product'
import { MARGIN, ASSET } from 'config'
import { COLOR, KEY, TITLE } from 'constant'

const MachineListSection = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: allMachineData, isLoading, isError, refetch: refetchAllMachine } = useGetAllMachineQuery()

  const { themeMode } = useSettingContext()

  useEffect(() => {
    if (isError) {
      snack('Failed to fetch machine data', { variant: COLOR.ERROR })
    } else if (isLoading) {
      snack('Loading machine data')
    } else {
      snack('Fetched All Machine Data', { variant: COLOR.SUCCESS })
      refetchAllMachine()
    }
    refetchAllMachine()
  }, [refetchAllMachine, allMachineData, isLoading, isError])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredData =
    allMachineData &&
    allMachineData.filter((row) => Object.values(row)?.some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())))

  return (
    <MotionLazyContainer display="flex">
      <Typography variant="h2">{TITLE.MACHINE_LIST}</Typography>
      <SearchBox term={searchTerm} mode={themeMode} handleSearch={handleSearch} />
      <Grid container flexDirection="row" {...MARGIN.PAGE_PROP}>
        <Grid item lg={12}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
              <GStyledTableHeaderBox bgcolor={themeMode === KEY.LIGHT ? 'success.main' : 'grey.800'} flex={1} px={2} pt={2} />
              <MachineListPagination count={allMachineData ? allMachineData?.length : 0} page={1} />
              <Table>
                <MachineHeader mode={themeMode} />
                {filteredData?.map((machine) => (
                  <MachineTable key={machine._id} machine={machine} mode={themeMode} />
                ))}
              </Table>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MotionLazyContainer>
  )
}

export default MachineListSection
