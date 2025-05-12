import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { RADIUS } from 'config';
import { VARIANT, KEY } from 'constant';
import { StyledClockBox, StyledBoxFlex } from './style';
import { huntTimezone } from './city-timezone';

const Clock = ({
  main,
  city,
  country = KEY.NEW_ZEALAND,
  region = KEY.AUCKLAND,
  local,
}) => {
  const [timeString, setTimeString] = useState('');
  const [localTimeString, setLocalTimeString] = useState('');
  const [showLocalTime, setShowLocalTime] = useState(true);

  const timezoneObj =
    huntTimezone(city, country, region) || huntTimezone(local) || {
      timezone: local,
    };
  const timezone = timezoneObj?.timezone || 'UTC';

  const getFormattedDateTime = (timezone) => {
    try {
      const now = new Date();

      const dateOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        timeZone: timezone,
      };

      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: timezone,
      };

      const datePart = now.toLocaleDateString('en-NZ', dateOptions);
      let timePart = now.toLocaleTimeString('en-NZ', timeOptions);
      timePart = timePart.replace(/\b(am|pm)\b/i, (match) =>
        match.toUpperCase()
      );

      return `${datePart} - ${timePart}`;
    } catch (err) {
      console.error('Error formatting date/time:', err);
      return 'Invalid Time';
    }
  };

  const getLocalTime = () => {
    const localTime = new Date();
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
    const localTimeString = getFormattedDateTime(localTimezone);
    setLocalTimeString(localTimeString);
  };

  useEffect(() => {
    const updateTime = () => {
      const formattedTime = getFormattedDateTime(timezone);
      setTimeString(formattedTime);
      getLocalTime();
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    
    if (timeString === localTimeString) {
      setShowLocalTime(false);
    } else {
      setShowLocalTime(true);
    }
  }, [timeString, localTimeString]);

  const displayLabel = main ? 'Pacific/Auckland' : timezone;

 
  const localTimezoneLabel = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <StyledBoxFlex
      gap={2}
      alignItems="center"
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[3],
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[6],
        },
      }}
    >
      <StyledClockBox
        sx={{
          ...RADIUS.BORDER,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          backgroundColor: (theme) => theme.palette.grey[100],
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Typography
          variant={VARIANT.TYPOGRAPHY.SUBTITLE2}
          color="text.secondary"
          sx={{ fontWeight: 900 }}
        >
          {displayLabel}-
        </Typography>
        <Typography
          variant={VARIANT.TYPOGRAPHY.H6}
          color="text.primary"
          sx={{ fontWeight: 600 }}
        >
          {timeString}
        </Typography>
      </StyledClockBox>

      {showLocalTime && (
        <StyledClockBox
          sx={{
            ...RADIUS.BORDER,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            backgroundColor: (theme) => theme.palette.grey[100],
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Typography
            variant={VARIANT.TYPOGRAPHY.SUBTITLE2}
            color="text.secondary"
            sx={{ fontWeight: 900 }}
          >
            {localTimezoneLabel}-
          </Typography>
          <Typography
            variant={VARIANT.TYPOGRAPHY.H6}
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {localTimeString}
          </Typography>
        </StyledClockBox>
      )}
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
