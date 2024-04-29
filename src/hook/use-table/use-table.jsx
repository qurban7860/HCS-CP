import { useState, useCallback } from 'react'
import { KEY } from 'constant'

export default function useTable(props) {
  const [dense, setDense] = useState(!!props?.defaultDense)

  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || KEY.NAME)

  const [order, setOrder] = useState(props?.defaultOrder || KEY.ASC)

  const [page, setPage] = useState(props?.defaultCurrentPage || 0)

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 100)

  const [selected, setSelected] = useState(props?.defaultSelected || [])

  const onSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && order === KEY.ASC
      if (id !== '') {
        setOrder(isAsc ? KEY.DESC : KEY.ASC)
        setOrderBy(id)
      }
    },
    [order, orderBy]
  )

  const onSelectRow = useCallback(
    (id) => {
      const selectedIndex = selected.indexOf(id)

      let newSelected = []

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
      }
      setSelected(newSelected)
    },
    [selected]
  )

  const onSelectAllRows = useCallback((checked, newSelecteds) => {
    if (checked) {
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }, [])

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  const onChangeRowsPerPage = useCallback((event) => {
    setPage(0)
    setRowsPerPage(parseInt(event.target.value, 10))
  }, [])

  const onChangeDense = useCallback((event) => {
    setDense(event.target.checked)
  }, [])

  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    //
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage
  }
}
