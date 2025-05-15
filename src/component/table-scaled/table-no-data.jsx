import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSettingContext } from 'hook'
import { TableBody, TableCell, TableRow } from '@mui/material'
import { EmptyContent } from 'component'
import { FALLBACK } from 'constant'

const TableNoData = ({ isNotFound, customeFallBack }) => {
    const { themeMode } = useSettingContext()
    return (
        <Fragment>
            {isNotFound && (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={12}>
                            <EmptyContent
                                {...(customeFallBack ? FALLBACK[customeFallBack] : FALLBACK.NO_DATA)}
                                sx={{
                                    color: themeMode === 'dark' ? 'text.secondary' : 'grey.700'
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            )}
        </Fragment>
    )
}

TableNoData.propTypes = {
    isNotFound: PropTypes.bool,
    customeFallBack: PropTypes.bool,
}

export default TableNoData
