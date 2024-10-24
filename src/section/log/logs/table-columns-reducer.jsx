const PAGE = 'logs'
export function tableColumnsReducer(state, action) {
 switch (action.type) {
  case 'setUpInitialColumns': {
   let columns = [...state]
   if (!action.logsPage) {
    columns = columns.filter(column => column.page !== PAGE)
   }
   columns = columns.map(column => ({ ...column, checked: column?.defaultShow || false }))
   return [...columns]
  }
  case 'updateColumnCheck': {
   const columns = [...state]
   const columnIndex = state.findIndex(columnItem => columnItem.id === action.columnId)
   if (columnIndex !== -1) {
    columns[columnIndex].checked = action.newCheckState
   }
   return [...columns]
  }
  case 'handleLogTypeChange': {
   let columns = action.newColumns
   if (!action.logsPage) {
    columns = columns?.filter(column => column.page !== PAGE)
   }
   columns = columns.map(column => ({ ...column, checked: column?.defaultShow || false }))
   return [...columns]
  }
  default: {
   throw Error(`Unknown action:  ${action.type}`)
  }
 }
}
