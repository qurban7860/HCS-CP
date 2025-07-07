import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'
import { GStyledSpanBox, GStyledFlexEndBox } from 'theme/style'
import { VARIANT, LABEL } from 'constant'
import { fDate } from 'util/format'

const { CREATED_BY, UPDATED_BY, CREATED_AT, UPDATED_AT } = LABEL.AUDIT
const { TYPOGRAPHY } = VARIANT

const AuditBox = ({ value, pb = 4, showOnlyDate = false }) => {
  const { createdAt, createdBy, updatedAt, updatedBy } = value

  return (
    <Box pb={pb}>
      <GStyledFlexEndBox>
        <Box>
          <GStyledSpanBox>
            <Typography variant={TYPOGRAPHY.OVERLINE} color='grey.500'>
              {showOnlyDate ? CREATED_AT : CREATED_BY} &nbsp;
            </Typography>
            {showOnlyDate ? (
              <Typography variant={TYPOGRAPHY.CAPTION} color='grey.500'>
                {createdAt ? fDate(createdAt) : ''}
              </Typography>
            ) : (
              <Typography variant={TYPOGRAPHY.CAPTION} color='grey.500'>
                {(createdBy || createdAt) && `${createdBy ? createdBy : ''}${createdBy && createdAt ? ' / ' : ''}${createdAt ? fDate(createdAt) : ''}`}
              </Typography>
            )}
          </GStyledSpanBox>
          <GStyledSpanBox>
            <Typography variant={TYPOGRAPHY.OVERLINE} color='grey.500'>
              {showOnlyDate ? UPDATED_AT : UPDATED_BY} &nbsp;
            </Typography>
            {showOnlyDate ? (
              <Typography variant={TYPOGRAPHY.CAPTION} color='grey.500'>
                {updatedAt ? fDate(updatedAt) : ''}
              </Typography>
            ) : (
              <Typography variant={TYPOGRAPHY.CAPTION} color='grey.500'>
                {(updatedBy || updatedAt) && `${updatedBy ? updatedBy : ''}${updatedBy && updatedAt ? ' / ' : ''}${updatedAt ? fDate(updatedAt) : ''}`}
              </Typography>
            )}
          </GStyledSpanBox>
        </Box>
      </GStyledFlexEndBox>
    </Box>
  )
}

AuditBox.propTypes = {
  value: PropTypes.any,
  pb: PropTypes.number,
  showOnlyDate: PropTypes.bool
}

export default AuditBox
