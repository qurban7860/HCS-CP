import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { FormHelperText } from '@mui/material'
// import { UploadAvatar, Upload, UploadBox } from '../upload'

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
}

export function RHFUploadAvatar({ name, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {/* <UploadAvatar error={!!error} file={field.value} {...other} /> */}

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  )
}

RHFUploadBox.propTypes = {
  name: PropTypes.string,
}

export function RHFUploadBox({ name, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      // render={({ field, fieldState: { error } }) => (
      //   <UploadBox files={field.value} error={!!error} {...other} />
      // )}
    />
  )
}

RHFUpload.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,
  rows: PropTypes.bool,
  helperText: PropTypes.node,
  machine: PropTypes.string,
  onChangeDocType: PropTypes.func,
  onChangeDocCategory: PropTypes.func,
  onChangeVersionNo: PropTypes.func,
  onChangeDisplayName: PropTypes.func,
  onChangeReferenceNumber: PropTypes.func,
  onChangeStockNumber: PropTypes.func,
  drawingPage: PropTypes.bool,
}

export function RHFUpload({
  name,
  multiple,
  rows,
  helperText,
  machine,
  onChangeDocType,
  onChangeDocCategory,
  onChangeVersionNo,
  onChangeDisplayName,
  onChangeReferenceNumber,
  onChangeStockNumber,
  drawingPage,
  ...other
}) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            multiple
            onChangeDocType={onChangeDocType}
            onChangeDocCategory={onChangeDocCategory}
            onChangeVersionNo={onChangeVersionNo}
            onChangeDisplayName={onChangeDisplayName}
            onChangeReferenceNumber={onChangeReferenceNumber}
            onChangeStockNumber={onChangeStockNumber}
            rows={rows}
            drawingPage
            machine={machine}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            drawingPage
            machine={machine}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        )
      }
    />
  )
}
