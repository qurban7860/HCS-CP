import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useTheme, Box, Popover, Typography } from '@mui/material'
import { TYPOGRAPHY, FLEX } from 'constant'
import { StyledArrow } from './styles';

const PopoverDefault = ({ id, open, anchorEl, arrow, onClose, localizedLabel, children }) => {
    const theme = useTheme()

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            sx={{
                display: FLEX.FLEX,
                zIndex: theme.zIndex.modal + 1
            }}
        >
            {arrow && <StyledArrow arrow={arrow} />}
            <Box sx={{ p: 1 }}>
                {localizedLabel && (
                     <Box sx={{ px: 2, pb: 1 }}>
                     <Typography variant={TYPOGRAPHY.SUBTITLE1}>
                        
                     </Typography>
                   </Box>
                 )}
           
                 {children}
            </Box>
        </Popover>
    )
}

PopoverDefault.propTypes = {
    id: PropTypes.string.isRequired,
    localizedLabel: PropTypes.string, 
    arrow: PropTypes.string, 
    open: PropTypes.bool.isRequired, 
    anchorEl: PropTypes.object.isRequired, 
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired 
}

export default PopoverDefault
