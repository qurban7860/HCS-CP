import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { ICON_NAME } from 'hook'
import { useSelector } from 'react-redux'
import { dispatch } from 'store'
import { getContacts } from 'store/slice'
import { Grid, Typography, IconButton, Divider, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSettingContext } from 'component/setting'
import { FormHeader, IconTooltip } from 'component'
import { GStyledCenterBox, GStyledListItemText, GStyledSpanBox } from 'theme/style'
import { VARIANT, SIZE, LABEL, KEY } from 'constant'

const { TYPOGRAPHY } = VARIANT

const ContactListWidget = ({ value }) => {
  const [icon, setIcon] = useState(null)

  const theme = useTheme()
  const { id } = useParams()
  const { themeMode } = useSettingContext()
  const { contacts } = useSelector((state) => state.contact)

  const fullName = (contact) => contact?.firstName + ' ' + contact?.lastName

  const getContactTitleOrEmail = (c) => {
    const hasValidTitle = c?.title
    const hasValidEmail = c?.email && c?.email.length <= 18
    const shouldShowSeparator = hasValidTitle && hasValidEmail

    return `${hasValidTitle ? c.title : ''}${shouldShowSeparator ? ' / ' : ''}${
      hasValidTitle && hasValidTitle.length <= 20 && hasValidEmail ? c.email : ''
    }`
  }

  useEffect(() => {
    if (id) {
      dispatch(getContacts(id))
    }
  }, [dispatch])

  return (
    <Grid container mb={2}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
        <GStyledSpanBox>
          <FormHeader label={LABEL.CONTACT(value?.machines?.length)} />
        </GStyledSpanBox>

        <Grid container p={2}>
          {value?.contacts?.length > 0 ? (
            contacts.map((c, index) => (
              <Fragment key={index}>
                <Grid item xs={10}>
                  <Box height={50}>
                    <GStyledListItemText
                      primary={
                        c && (
                          <GStyledSpanBox>
                            <IconButton
                              // activate when contact view page is ready
                              // onClick={() => window.open(PATH_MACHINE.machines.view(c.machine._id), KEY.BLANK)}
                              size={SIZE.MEDIUM}
                              color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                              aria-label="view"
                              target={KEY.BLANK}
                              sx={{
                                padding: 0,
                                borderRadius: 2,
                                m: 0
                              }}>
                              <Typography color={themeMode === KEY.LIGHT ? 'common.black' : 'grey.400'} variant={TYPOGRAPHY.H4}>
                                {fullName(c)}
                              </Typography>
                            </IconButton>
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
                <Grid item xs={2} flex={1} justifyContent={KEY.CENTER} alignContent={KEY.CENTER}>
                  <GStyledCenterBox>
                    <IconTooltip
                      title={LABEL.CONTACT_THIS(c.firstName, c.phone)}
                      icon={ICON_NAME.PHONE}
                      color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange}
                      dimension={15}
                    />
                  </GStyledCenterBox>
                </Grid>
                {index !== contacts.length - 1 && <Divider variant="fullWidth" style={{ width: '100%', marginBottom: '10px' }} />}
              </Fragment>
            ))
          ) : (
            <Typography variant={TYPOGRAPHY.OVERLINE1} color="text.no">
              {LABEL.NO_CONTACT_FOUND}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

ContactListWidget.propTypes = {
  value: PropTypes.object
}

export default ContactListWidget
