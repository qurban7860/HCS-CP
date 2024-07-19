import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { VARIANT, LABEL } from 'constant'
import { fDate } from 'util/format'

const { CREATED_BY, UPDATED_BY } = LABEL.AUDIT
const { TYPOGRAPHY } = VARIANT

const AuditBox = ({ value }) => {
  const { createdAt, createdBy, updatedAt, updatedBy, createdIP, updatedIP } = value

  return (
    <Box>
      <GStyledSpanBox>
        <Typography variant={TYPOGRAPHY.OVERLINE} color="grey.500">
          {CREATED_BY} &nbsp;
        </Typography>
        <Typography variant={TYPOGRAPHY.BODY2} color="grey.500">
          {createdBy && createdBy} {createdAt && `${' / ' + fDate(createdAt)}`} {createdIP && `/ ${createdIP}`}
        </Typography>
      </GStyledSpanBox>
      <GStyledSpanBox>
        <Typography variant={TYPOGRAPHY.OVERLINE} color="grey.500">
          {UPDATED_BY} &nbsp;
        </Typography>
        <Typography variant={TYPOGRAPHY.BODY2} color="grey.500">
          {updatedBy} {updatedAt && `${' / ' + fDate(updatedAt)}`} {updatedIP && `/ ${updatedIP}`}
        </Typography>
      </GStyledSpanBox>
    </Box>
  )
}

AuditBox.propTypes = {
  value: PropTypes.any
}

export default AuditBox
