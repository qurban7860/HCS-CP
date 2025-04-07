import PropTypes from 'prop-types'
import { useResponsive } from 'hook'
import { Grid } from '@mui/material'
import { ViewFormField } from 'component/viewform'
import { TYPOGRAPHY } from 'constant'

const GridViewField = ({ heading, isLoading, isNoBg, noBreakSpace, children, gridSize = 6, chip, isEditor, isLink, userRolesChip, multiline, height, minHeight, alignItems, ...other }) => {
    const isMobile = useResponsive('down', 'sm')
    return (
        <Grid
            item
            xs={12}
            sm={gridSize}
            sx={{ overflow: 'auto' }}>
            <ViewFormField
                heading={heading}
                isLoading={isLoading}
                isEditor={isEditor}
                chip={chip && chip}
                isNoBg={isNoBg}
                noBreakSpace={noBreakSpace}
                userRolesChip={userRolesChip && userRolesChip}
                variant={isMobile ? TYPOGRAPHY.BODY2 : TYPOGRAPHY.BODY1}
                multiline={multiline}
                height={height}
                minHeight={minHeight}
                alignItems={alignItems}
                // phoneChips={children}
                {...other}>
                {children}
            </ViewFormField>
        </Grid>
    )
}

GridViewField.propTypes = {
    heading: PropTypes.string,
    isLoading: PropTypes.bool,
    isEditor: PropTypes.bool,
    children: PropTypes.node,
    gridSize: PropTypes.number,
    isLink: PropTypes.bool,
    isNoBg: PropTypes.bool,
    noBreakSpace: PropTypes.bool,
    userRolesChip: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    chip: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    multiline: PropTypes.bool,
    height: PropTypes.string,
    minHeight: PropTypes.string,
    alignItems: PropTypes.string
}

export default GridViewField
