import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Global } from '@emotion/react';
import { GLOBAL } from 'config';

// const SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';


const ReCaptcha = ({ onVerify }) => {
  const captchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    const scriptId = 'recaptcha-script';

    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(scriptId)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript()
      .then(() => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => {
            if (captchaRef.current && widgetIdRef.current === null) {
              widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
                sitekey: GLOBAL.SITE_KEY,
                callback: (token) => onVerify(token),
                'expired-callback': () => onVerify(null),
              });
            }
          });
        } else {
          console.error('grecaptcha.ready is not available');
        }
      })
      .catch(() => {
        console.error('Failed to load reCAPTCHA script');
      });
  }, [onVerify]);

  return (
 <Paper
  elevation={0}
  sx={{
    mt: 2,
    textAlign: 'center',
    bgcolor: 'transparent',
    boxShadow: 'none',
    width: { xs: '100%', sm: '95%', md: '90%', lg: '85%' },
    mx: 'auto',
    p: 0,
  }}
>
  <Box
    ref={captchaRef}
    sx={{
      display: 'inline-block',
      transform: 'scale(1)', 
      transformOrigin: 'top left',
      width: '100%',
      mx: 'auto',
      p: 0,
      ml: { xs: 0, sm: 2, md: 3, lg: 3 },
      bgcolor: 'transparent',
      border: 'none',
    }}
  />
</Paper>

  );
};

export default ReCaptcha;
