export function applySort({ inputData, comparator }) {
    const stabilizedThis = Array.isArray(inputData) && inputData?.map((el, index) => [el, index]) || []
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })

    inputData = stabilizedThis?.map(el => el[0]) || []
    return inputData
}
