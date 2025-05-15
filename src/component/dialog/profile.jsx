import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Typography, Chip } from '@mui/material';
import { PopoverDefault } from 'component/popover'
import { GStyledTableChip } from 'theme/style'

function ChipInPopover({ open, onClose, ListArr, ListTitle }) {
    return (
        <PopoverDefault open={open} anchorEl={open} onClose={onClose}
            arrow='top-right'
            aria-hidden={!open}
            localizedLabel={ListTitle}
        >
            <Box >
                {ListArr?.map((el) => (<GStyledTableChip label={el?.defaultName || ""} />))}
            </Box>
        </PopoverDefault>
    );
}
export default memo(ChipInPopover)

ChipInPopover.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.func,
    ListArr: PropTypes.array,
    ListTitle: PropTypes.string,
};
