import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { Icon, ICON_NAME } from 'hook'
import { styled, alpha } from '@mui/material/styles'
import { ICON } from 'config/layout'

const StyledDropZone = styled('div')(({ theme }) => ({
  width: 64,
  height: 64,
  fontSize: 24,
  display: 'flex',
  flexShrink: 0,
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0.5),
  color: theme.palette.text.disabled,
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  '&:hover': {
    opacity: 0.72,
  },
}))

UploadBox.propTypes = {
  sx: PropTypes.object,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.node,
};

export default function UploadBox({ placeholder, error, disabled, sx, ...other }) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const isError = isDragReject || error;

  return (
    <StyledDropZone
      {...getRootProps()}
      sx={{
        ...(isDragActive && {
          opacity: 0.72,
        }),
        ...(isError && {
          color: 'error.main',
          bgcolor: 'error.lighter',
          borderColor: 'error.light',
        }),
        ...(disabled && {
          opacity: 0.48,
          pointerEvents: 'none',
        }),
        ...sx,
      }}
    >
      <input {...getInputProps()} />
      {placeholder || <Icon icon={ICON_NAME.UPLOAD} sx={{ ...ICON.SIZE_MD }} />}
    </StyledDropZone>
  );
}
