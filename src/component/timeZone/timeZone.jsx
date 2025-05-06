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

    const updateTime = () => {
      const now = new Date();

      const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timeZone,
      };

      const local = now.toLocaleString(undefined, options);
      const nz = now.toLocaleString('en-NZ', {
        ...options,
        timeZone: 'Pacific/Auckland',
      });

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

  return (
    <Box display="flex" alignItems="center" gap={3}>
      <Box sx={boxStyle}>
        <Typography variant="caption" sx={{ color: textColor }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            Auckland:
          </Box>{' '}
          {nzTime}
        </Typography>
      </Box>

      <Box sx={boxStyle}>
        <Typography variant="caption" sx={{ color: textColor }}>
          <Box component="span" sx={{ fontWeight: 700 }}>
            {localZone}:
          </Box>{' '}
          {localTime}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeDisplay;
