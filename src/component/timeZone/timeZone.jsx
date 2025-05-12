import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Popover,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSettingContext } from 'hook';
import { KEY } from 'constant';

const TimeDisplay = () => {
  const [localTime, setLocalTime] = useState('');
  const [nzTime, setNzTime] = useState('');
  const [localZone, setLocalZone] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const { themeMode } = useSettingContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocalZone(timeZone);

    const getFormattedTime = (date, timeZone) => {
      const optionsDate = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        timeZone,
      };
      const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone,
      };

      const datePart = date.toLocaleDateString('en-NZ', optionsDate);
      let timePart = date.toLocaleTimeString('en-NZ', optionsTime);
      timePart = timePart.replace(/\b(am|pm)\b/i, match => match.toUpperCase());

      return `${datePart} - ${timePart}`;
    };

    const updateTime = () => {
      const now = new Date();
      setNzTime(getFormattedTime(now, 'Pacific/Auckland'));
      setLocalTime(getFormattedTime(now, timeZone));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const boxStyle = {
    backgroundColor:
      themeMode === KEY.LIGHT
        ? theme.palette.grey[300]
        : theme.palette.grey[800],
    borderRadius: 1,
    minWidth: 200,
    px: 2,
    py: 0.5,
  };

  const textColor =
    themeMode === KEY.LIGHT
      ? theme.palette.grey[800]
      : theme.palette.grey[100];

  const isSameTime = nzTime === localTime;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const renderTimeInfo = () => (
    <>
      <Box sx={boxStyle} mb={isSmallScreen ? 1 : 0}>
        <Typography variant="caption" sx={{ color: textColor }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Pacific/Auckland -
          </Box>{' '}
          {nzTime}
        </Typography>
      </Box>

      {!isSameTime && (
        <Box sx={boxStyle}>
          <Typography variant="caption" sx={{ color: textColor }}>
            <Box component="span" sx={{ fontWeight: 700 }}>
              {localZone} -
            </Box>{' '}
            {localTime}
          </Typography>
        </Box>
      )}
    </>
  );

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {isSmallScreen ? (
        <>
          <IconButton onClick={handleClick} aria-label="time">
            <AccessTimeIcon />
          </IconButton>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Box p={2} display="flex" flexDirection="column">
              {renderTimeInfo()}
            </Box>
          </Popover>
        </>
      ) : (
        renderTimeInfo()
      )}
    </Box>
  );
};

export default TimeDisplay;
