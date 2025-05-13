export function tableColumnsReducer(state, action) {
    switch (action.type) {
        case 'setUpInitialColumns': {
            let columns = [...state]
            columns = columns.map(column => ({ ...column, checked: column?.checked || false }))
            return [...columns]
        }
        case 'updateColumnCheck': {
            return state.map(column =>
                column.id === action.columnId
                    ? { ...column, checked: action.newCheckState }
                    : column
            );
        }
        default: {
            throw Error(`Unknown action:  ${action.type}`)
        }
    }
}
