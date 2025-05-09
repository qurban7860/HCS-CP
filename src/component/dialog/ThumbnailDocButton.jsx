import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Typography } from '@mui/material';
// styles
import { GStyledTooltip } from 'theme/style';
import { useTheme } from '@mui/material/styles';
// components
import { Iconify } from 'component/iconify';
 
ThumbnailDocButton.propTypes = {
  onClick: PropTypes.func,
  size:PropTypes.number,
};
 
export default function ThumbnailDocButton({ onClick, size=150 }) {
  return (
    <GStyledTooltip placement="top" title={size>=150?"":"Add File"}>
      <Button onClick={onClick} variant='outlined' sx={{display:'block', height:size, width:'100%'}} >
        <Iconify icon="mdi:plus" width={50} />
        <Typography variant="subtitle2">Add / Upload File</Typography>
      </Button>
    </GStyledTooltip>
  );
}