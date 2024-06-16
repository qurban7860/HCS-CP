import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledContactCard, GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { IconTooltip } from 'component'
import { LABEL, TYPOGRAPHY, KEY, FLEX } from 'constant'

const ContactCard = ({ selectedCardId, value, handleContactCard, c }) => {
  const theme = useTheme()
  const { themeMode } = useSettingContext()

  const fullName = (contact) => contact?.firstName + ' ' + contact?.lastName
  const notEmployed = value?.formerEmployee === true
  const getContactTitleOrEmail = (c) => {
    const hasValidTitle = c?.title
    const hasValidEmail = c?.email && c?.email.length <= 18
    const shouldShowSeparator = hasValidTitle && hasValidEmail

    return `${hasValidTitle ? c.title : ''}${shouldShowSeparator ? ' / ' : ''}${
      hasValidTitle && hasValidTitle.length <= 20 && hasValidEmail ? c.email : ''
    }`
  }
  return (
    <GStyledContactCard onClick={(event) => handleContactCard(event, c._id)} selectedCardId={selectedCardId} c={c} mode={themeMode}>
      <Grid item xs={10}>
        <Box height={50}>
          <GStyledListItemText
            primary={
              c && (
                <GStyledSpanBox>
                  <Typography
                    color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'}
                    variant={TYPOGRAPHY.H5}
                    sx={{
                      opacity: selectedCardId === c._id ? 0.7 : 1
                    }}>
                    {fullName(c)}
                  </Typography>
                </GStyledSpanBox>
              )
            }
            secondary={
              <Typography variant={TYPOGRAPHY.BODY2} color="text.secondary">
                {getContactTitleOrEmail(c)}
              </Typography>
            }
          />
        </Box>
      </Grid>
      <Grid item xs={2} flex={1} justifyContent={FLEX.FLEX_END} alignContent={KEY.RIGHT}>
        <GStyledSpanBox justifyContent={FLEX.FLEX_END} gap={1}>
          <IconTooltip
            title={LABEL.CONTACT_THIS(c.firstName, c.phone)}
            icon={ICON_NAME.PHONE}
            color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
            dimension={18}
            disabled={!c.phone}
            isActiveIcon
            iconOnly
            cursor={c.phone !== null}
          />
          <IconTooltip
            title={notEmployed ? LABEL.NOT_EMPLOYED : LABEL.CURRENTLY_EMPLOYED}
            icon={notEmployed ? ICON_NAME.NOT_EMPLOYED : ICON_NAME.CURRENTLY_EMPLOYED}
            color={
              notEmployed
                ? theme.palette.error.dark
                : !notEmployed && themeMode === KEY.LIGHT
                ? theme.palette.burnIn.altDark
                : theme.palette.burnIn.main
            }
            dimension={18}
            disabled={!c.phone}
            isActiveIcon
            iconOnly
          />
        </GStyledSpanBox>
      </Grid>
    </GStyledContactCard>
  )
}

ContactCard.propTypes = {
  selectedCardId: PropTypes.string,
  value: PropTypes.any,
  handleContactCard: PropTypes.func,
  contact: PropTypes.any,
  c: PropTypes.any
}

export default ContactCard
