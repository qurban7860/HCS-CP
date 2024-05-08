import React from 'react'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { Grid, Typography } from '@mui/material'
import { VARIANT } from 'constant'

NothingProvided.propTypes = {
  content: PropTypes.string
}

function NothingProvided({ content }) {
  const { Icon, iconSrc: warningIconSrc } = useIcon(ICON_NAME.WARNING)

  const { TYPOGRAPHY } = VARIANT

  return (
    <Grid container item md={12} p={2} justifyContent="center" color="text.disabled">
      <Icon icon={warningIconSrc} />
      <Typography variant={TYPOGRAPHY.OVERLINE1} color="grey.500">
        &nbsp;&nbsp;{content}
      </Typography>
    </Grid>
  )
}

export default NothingProvided
