import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSettingContext } from 'hook';
import { KEY } from 'constant';

const TimeDisplay = () => {
  const [localTime, setLocalTime] = useState('');
  const [nzTime, setNzTime] = useState('');
  const [localZone, setLocalZone] = useState('');
  const { themeMode } = useSettingContext();
  const theme = useTheme();

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

      const datePart = date.toLocaleDateString('en-NZ', optionsDate); // e.g., Thu, 08 May
      let timePart = date.toLocaleTimeString('en-NZ', optionsTime);   // e.g., 06:20:27 pm

      // Ensure AM/PM is uppercase
      timePart = timePart.replace(/\b(am|pm)\b/i, match => match.toUpperCase());

      return `${datePart} - ${timePart}`;
    };

    const updateTime = () => {
      const now = new Date();
      const local = getFormattedTime(now, timeZone);
      const nz = getFormattedTime(now, 'Pacific/Auckland');

      setLocalTime(local);
      setNzTime(nz);
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

  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Box sx={boxStyle}>
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
    </Box>
  );
};

export default TimeDisplay;
