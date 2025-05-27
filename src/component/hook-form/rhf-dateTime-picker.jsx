import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import enUS from 'antd/locale/en_US';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSettingContext } from 'hook'; 
import { RADIUS } from 'config/layout'; 
import { KEY, TYPOGRAPHY } from 'constant'; 
import { AntDSDatePickerWrapper } from './style';

ConfigProvider.config({
  theme: {
    components: {
      DatePicker: {
        dateFormat: 'DD/MM/YYYY HH:mm',

      },
    },
  },
});

export default function RHFDateTimePicker({
  name,
  label,
  defaultValue = null,
  helperText,
  error,
  size = 'large',
  variant = 'filled',
  ...other
}) {
  const { control } = useFormContext();
  const { themeMode } = useSettingContext();
  const theme = useTheme();

  const convertToDateObject = (value) => {
    if (!value) return null;
    if (dayjs.isDayjs(value)) return value;
    return dayjs(value);
  };

  const antdTheme = {
    components: {
      DatePicker: {
        fontSize: '14px',
        fontFamily: 'Yantramanav, sans-serif',
        
      },
    },
  };

  return (
    <ConfigProvider locale={enUS} theme={antdTheme}>
      <AntDSDatePickerWrapper>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
    <Typography variant={TYPOGRAPHY.SUBTITLE2} sx={{ whiteSpace: 'nowrap', minWidth: 80 }}>
      {label}
    </Typography>
    <div style={{ flexGrow: 1 }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <>
            <DatePicker
              {...field}
              size={size}
              variant={variant}
              title={label}
              placeholder={label}
              style={{
                width: '100%',
                borderRadius: RADIUS.FORM.borderRadius,
                color:
                  themeMode === KEY.LIGHT
                    ? theme.palette.grey[800]
                    : theme.palette.grey[400],
                backgroundColor:
                  themeMode === KEY.LIGHT
                    ? theme.palette.grey[200]
                    : theme.palette.grey[600],
              }}
              status={error ? 'error' : undefined}
              onChange={(date) => {
                field.onChange(date ? date.toDate() : null);
              }}
              value={convertToDateObject(field.value)}
              format="DD/MM/YYYY HH:mm"
             showTime={{ format: 'HH:mm' }}
              {...other}
            />
            {(error || helperText) && (
              <div
                style={{
                  marginTop: 4,
                  color: error
                    ? theme.palette.error.main
                    : theme.palette.grey[400],
                }}
              >
                {error?.message || helperText}
              </div>
            )}
          </>
        )}
      />
    </div>
  </div>
</AntDSDatePickerWrapper>
      
    </ConfigProvider>
  );
}

RHFDateTimePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.any,
  helperText: PropTypes.node,
  error: PropTypes.object,
  size: PropTypes.string,
  variant: PropTypes.string,
};
