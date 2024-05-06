import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent, TimelineOppositeContent } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { KEY, VARIANT } from 'constant'
import { GStyledSpanBox } from 'theme/style'

const { TYPOGRAPHY } = VARIANT

const HistoryTimelineItem = ({ date, icon, story, color, transferredTo }) => {
  // const { Icon: IconTo, iconSrc } = useIcon(icon)
  const { Icon: RightIcon, iconSrc: rightSrc } = useIcon(ICON_NAME.CHEVRON_RIGHT)

  switch (icon) {
    case ICON_NAME.SHIPPED:
      color = 'common.white'
      break
    case ICON_NAME.INSTALL:
      color = 'primary.dark'
      break
    case ICON_NAME.TRANSFER:
      color = 'error.dark'
      break
    default:
      color = 'grey.300'
  }

  const isTransfer = icon === ICON_NAME.TRANSFER
  const isPurchased = icon === ICON_NAME.PURCHASED
  const background = isTransfer ? 'error.main' : 'grey.500'

  return (
    <TimelineItem>
      <TimelineSeparator>
        {!isPurchased && <TimelineConnector />}
        <TimelineDot sx={{ backgroundColor: background }} />
        {!isTransfer && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent align={KEY.LEFT}>
        <Box>
          <Typography variant={TYPOGRAPHY.OVERLINE1} fontWeight="bold" color="grey.500">
            {story}
          </Typography>
          <Typography variant={TYPOGRAPHY.BODY1} fontWeight="bold" color="grey.700">
            {date}
          </Typography>
          {isTransfer && (
            <GStyledSpanBox>
              <RightIcon icon={rightSrc} color={color} />
              <Typography variant={TYPOGRAPHY.BODY2} color="grey.500">
                {transferredTo || 'Unspecified'}
              </Typography>
            </GStyledSpanBox>
          )}
        </Box>
      </TimelineContent>
    </TimelineItem>
  )
}

HistoryTimelineItem.propTypes = {
  date: PropTypes.string,
  icon: PropTypes.oneOf(Object.values(ICON_NAME)),
  story: PropTypes.string,
  color: PropTypes.string,
  transferredTo: PropTypes.string || null
}

export default HistoryTimelineItem
