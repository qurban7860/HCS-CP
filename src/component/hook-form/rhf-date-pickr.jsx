import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'

RHFDatePickr.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.string,
    helperText: PropTypes.node,
    Error: PropTypes.bool
}

export default function RHFDatePickr({ name, label, size, helperText, Error, ...other }) {
    const { control } = useFormContext()
    const FORMAT = 'DD/MM/YYYY'

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    {...field}
                    // remove the shadow of the calendar
                    sx={{ '& .MuiPopper-paper': { boxShadow: 'none' } }}
                    name={name}
                    inputFormat={FORMAT}
                    label={label}
                    onChange={newValue => {
                        const nativeDate = newValue?.toDate?.() || null
                        field.onChange(nativeDate)
                    }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            size={size}
                            inputProps={{ ...params.inputProps, readOnly: false }}
                            error={!!error || !!Error}
                            helperText={error ? error?.message : helperText}
                            {...other}
                        />
                    )}
                />
            )}
        />
    )
}
