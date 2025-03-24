import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { FormHelperText } from '@mui/material'
import { Upload } from 'component'

RHFUpload.propTypes = {
  name          : PropTypes.string,
  multiple      : PropTypes.bool,
  rows          : PropTypes.bool,
  hideFiles     : PropTypes.bool,
  helperText    : PropTypes.node,
  machine       : PropTypes.string,
  isDocumentList: PropTypes.bool,
  drawingPage   : PropTypes.bool,
  imagesOnly    : PropTypes.bool,
  dropZone      : PropTypes.bool,
  onLoadImage   : PropTypes.func,
  onLoadPDF     : PropTypes.func,
  onDownload    : PropTypes.func,
};

export function RHFUpload({
  name,
  multiple,
  rows,
  hideFiles,
  helperText,
  machine,
  isDocumentList,
  onLoadImage,
  onLoadPDF,
  onDownload,
  drawingPage,
  dropZone=true,
  imagesOnly,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) =>
        multiple ? (
          <Upload
            dropZone={dropZone}
            multiple
            imagesOnly={imagesOnly}
            isDocumentList={isDocumentList}
            onLoadImage={ onLoadImage }
            onLoadPDF={onLoadPDF}
            onDownload={ onDownload }
            rows={rows}
            hideFiles={hideFiles}
            drawingPage
            machine={machine}
            files={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && !hideFiles && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )
            }
            {...other}
          />
        ) : (
          <Upload
            dropZone={dropZone}
            imagesOnly={imagesOnly}
            machine={machine}
            file={field.value}
            error={!!error}
            helperText={
              (!!error || helperText) && (
                <FormHelperText error={!!error} sx={{ px: 2 }}>
                  {error ? error?.message : helperText}
                </FormHelperText>
              )}
            {...other}
          />
        )
      }
    />
  );
}
