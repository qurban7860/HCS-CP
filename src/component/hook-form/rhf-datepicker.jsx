import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { DatePicker } from 'antd'
import enUS from 'antd/locale/en_US'
import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import { useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { RADIUS } from 'config/layout'
import { KEY } from 'constant'
import { AntDSDatePickerWrapper } from './style'

ConfigProvider.config({
 theme: {
  components: {
   DatePicker: {
    dateFormat: 'DD/MM/YYYY'
   }
  }
 }
})

export default function RHFDatePicker({ name, label, defaultValue, helperText, error, size = 'large', variant = 'filled', ...other }) {
 const { control } = useFormContext()
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const convertToDateObject = value => {
  if (!value) return null
  if (dayjs.isDayjs(value)) return value
  return dayjs(value)
 }

 const antdTheme = {
  components: {
   DatePicker: {
    fontSize: '14px',
    fontFamily: 'Yantramanav, sans-serif'
   }
  }
 }

 return (
  <ConfigProvider locale={enUS} theme={antdTheme}>
   <AntDSDatePickerWrapper>
    <div className='w-full'>
     <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
       <div>
        <DatePicker
         {...field}
         size={size}
         variant={variant}
         label={label}
         placeholder={label}
         style={{
          width: '100%',
          borderRadius: RADIUS.FORM.borderRadius,
          color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[400],
          backgroundColor: themeMode === KEY.LIGHT ? theme.palette.grey[200] : theme.palette.grey[600],
          '& .antPickerSuffix': {
           color: themeMode === KEY.LIGHT ? theme.palette.grey[800] : theme.palette.grey[200]
          }
         }}
         status={error ? 'error' : undefined}
         onChange={date => {
          field.onChange(date ? date.toDate() : null)
         }}
         value={convertToDateObject(field.value)}
         format='DD/MM/YYYY'
         {...other}
        />
        {(error || helperText) && <div style={{ marginTop: 1, color: error ? theme.palette.error.main : theme.palette.grey[400] }}>{error?.message || helperText}</div>}
       </div>
      )}
     />
    </div>
   </AntDSDatePickerWrapper>
  </ConfigProvider>
 )
}

RHFDatePicker.propTypes = {
 name: PropTypes.string,
 label: PropTypes.string,
 size: PropTypes.string,
 variant: PropTypes.string,
 defaultValue: PropTypes.any,
 helperText: PropTypes.node,
 error: PropTypes.object,
 value: PropTypes.any
}
