import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext, useLimitString } from 'hook'
import { TableBody, TableCell, Switch } from '@mui/material'
import { LinkTableCell } from 'component'
import { StyledTableRow } from './style'
import { fDateTime } from 'util'

const TableRow = ({ index, hover, onViewRow, onView, columns, row, selected }) => {
    const { themeMode } = useSettingContext()
    const lowercaseRow = {}
    Object.entries(row).forEach(([key, value]) => {
        if (typeof key === 'string') lowercaseRow[key.toLocaleLowerCase()] = value
    })

    function getNestedValueCaseInsensitive(obj, path) {
        if (!obj || typeof path !== 'string') return undefined;

        const parts = path.split(/[\.\[\]]/).filter(Boolean); // supports dot and [0] notation

        let current = obj;

        for (const part of parts) {
            if (current === null || typeof current !== 'object') return undefined;

            // Handle arrays
            if (Array.isArray(current)) {
                const index = parseInt(part, 10);
                if (isNaN(index) || index < 0 || index >= current.length) return undefined;
                current = current[index];
                continue;
            }

            // Case-insensitive key matching
            const matchedKey = Object.keys(current).find(
                (key) => key.toLowerCase() === part.toLowerCase()
            );

            if (!matchedKey) return undefined;

            current = current[matchedKey];
        }

        return current;
    }
    return (
        <Fragment>
            <TableBody>
                <StyledTableRow index={index} hover={hover} onClick={onViewRow} mode={themeMode} selected={selected}>
                    {/* <LinkTableCell align='left' onClick={onViewRow} param={displayName} /> */}
                    {columns?.map((column, index) => {
                        if (!column?.checked) return null;
                        let cellValue = getNestedValueCaseInsensitive(row, column.id);
                        // let cellValue = lowercaseRow?.[column.id.toLocaleLowerCase()];
                        if (['createdAt'].includes(column.id)) {
                            cellValue = fDateTime(cellValue);
                        }
                        return (
                            <TableCell key={index} align={column?.align || 'left'}>
                                {typeof cellValue === 'boolean' ? <Switch checked={cellValue} /> : useLimitString(cellValue, 40)}
                            </TableCell>
                        );
                    })}

                </StyledTableRow>
            </TableBody>
        </Fragment>
    )
}

TableRow.propTypes = {
    mode: PropTypes.string,
    index: PropTypes.number,
    orderBy: PropTypes.string,
    onView: PropTypes.func,
    onViewRow: PropTypes.func,
    dataFiltered: PropTypes.array,
    columns: PropTypes.array,
    order: PropTypes.string,
    onSort: PropTypes.func,
    row: PropTypes.object,
    selected: PropTypes.bool,
    hover: PropTypes.bool,
}

export default TableRow
