import PropTypes from 'prop-types'
import { Image } from 'component'

PreviewSingleFile.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default function PreviewSingleFile({ file }) {
  if (!file) {
    return null
  }

  const imgUrl = typeof file === 'string' ? file : file.preview

  return (
    <Image
      alt="file preview"
      src={imgUrl}
      sx={{
        top         : 8,
        left        : 8,
        zIndex      : 8,
        borderRadius: 1,
        position    : 'absolute',
        width       : 'calc(100% - 16px)',
        height      : 'calc(100% - 16px)',
      }}
    />
  );
}
