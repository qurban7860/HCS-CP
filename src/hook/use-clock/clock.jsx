import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { RADIUS, TIME } from 'config';
import { VARIANT, KEY } from 'constant';
import { StyledClockBox, StyledBoxFlex } from './style';
import { huntTimezone } from './city-timezone';

const Clock = ({ main, city, country = KEY.NEW_ZEALAND, region = KEY.AUCKLAND, local }) => {
  const [timeString, setTimeString] = useState('');
  const timezoneObj = huntTimezone(city, country, region) || huntTimezone(local) || { timezone: local };
  const timezone = timezoneObj?.timezone || 'UTC';

  const getTimeString = () => {
    try {
      const now = new Date();
      return new Intl.DateTimeFormat('en-NZ', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timezone,
      }).format(now);
    } catch (err) {
      console.error('Error formatting time:', err);
      return 'Invalid Time';
    }
  };

  useEffect(() => {
    const updateTime = () => {
      setTimeString(getTimeString());
    };

    updateTime(); 
    const interval = setInterval(updateTime, 1000); 

    return () => clearInterval(interval);
  }, [timezone]);

  const displayLabel = main ? 'Auckland' : timezone;

  return (
    <StyledBoxFlex gap={2}>
      <StyledClockBox sx={RADIUS.BORDER}>
        <span>{displayLabel}: &nbsp;</span>
        <Typography variant={VARIANT.TYPOGRAPHY.H6}>
          {timeString}
        </Typography>
      </StyledClockBox>
    </StyledBoxFlex>
  ); 
  
};

Clock.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  main: PropTypes.bool,
  region: PropTypes.string,
  local: PropTypes.string,
};

export default Clock; 