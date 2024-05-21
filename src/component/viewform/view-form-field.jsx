import { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Typography, Chip, IconButton } from '@mui/material'
import { GStyledSpanBox, GStyledPopover } from 'theme/style'
import { useSettingContext } from 'component/setting'
import { useIcon, ICON_NAME } from 'hook'
import { SkeletonViewFormField } from 'component/skeleton'
import { TYPOGRAPHY_VARIANT, SIZE, VARIANT, KEY } from 'constant'
import { StyledDefaultTypography, StyledFieldGrid, StyledChipGrid, StyledFieldChip } from './style'

const { TYPOGRAPHY } = VARIANT

const ViewFormField = ({ children, heading, variant, isLoading, gridSize, contact, isWidget, isOrg, alias, link }) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { themeMode } = useSettingContext()
  const { pathname } = useLocation()

  const { Icon: WebIcon, iconSrc: openInSrc } = useIcon(ICON_NAME.OPEN_IN_NEW)

  useEffect(() => {
    if (open) {
      handleClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <StyledFieldGrid item xs={!isWidget && 12} sm={gridSize} mode={themeMode} isOrg={isOrg}>
      <Typography variant={TYPOGRAPHY.OVERLINE1} color="grey.600">
        {heading}
      </Typography>
      {isLoading ? (
        <m.div>
          <SkeletonViewFormField />
        </m.div>
      ) : (
        <>
          {link ? (
            <GStyledSpanBox>
              <StyledDefaultTypography variant={variant}> &nbsp; {link} </StyledDefaultTypography> &nbsp;
              <GStyledPopover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: KEY.CENTER, horizontal: KEY.RIGHT }}
                transformOrigin={{ vertical: KEY.CENTER, horizontal: KEY.LEFT }}>
                <Typography variant={TYPOGRAPHY.OVERLINE} color={themeMode === KEY.DARK ? 'howick.orange' : 'howick.blue'}>
                  Go to {link} &nbsp;
                </Typography>
              </GStyledPopover>
              <IconButton
                onClick={() => window.open(`https://` + link, KEY.BLANK)}
                size={SIZE.MEDIUM}
                color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                aria-label="view"
                target={KEY.BLANK}
                sx={{
                  padding: 0.5,
                  borderRadius: 2,
                  m: 0
                }}>
                <WebIcon icon={openInSrc} width={15} />
              </IconButton>
            </GStyledSpanBox>
          ) : (
            <StyledDefaultTypography variant={variant}>&nbsp; {children}</StyledDefaultTypography>
          )}

          {contact && typeof contact === 'object' && contact.length > 0 ? (
            <StyledChipGrid container>
              {contact.map((chip, index) => (
                <StyledFieldChip
                  key={index}
                  mode={themeMode}
                  label={<Typography variant={TYPOGRAPHY_VARIANT.H5}>{` ${chip?.firstName || ''} ${chip?.lastName || ''}`}</Typography>}
                  size={SIZE.SMALL}
                />
              ))}
            </StyledChipGrid>
          ) : (
            contact &&
            typeof contact?.firstName === 'string' && <Chip label={`${contact?.firstName || ''} ${contact?.lastName || ''}`} sx={{ m: 0.2 }} />
          )}
          {alias && typeof alias === 'object' && alias.length > 0 ? (
            <StyledChipGrid container>
              {alias.map((chip, index) => (
                <StyledFieldChip
                  key={index}
                  mode={themeMode}
                  label={<Typography variant={TYPOGRAPHY_VARIANT.H5}>{chip}</Typography>}
                  size={SIZE.SMALL}
                />
              ))}
            </StyledChipGrid>
          ) : (
            alias && typeof alias === 'string' && <Chip label={alias} sx={{ m: 0.2 }} />
          )}
        </>
      )}
    </StyledFieldGrid>
  )
}

ViewFormField.propTypes = {
  gridSize: PropTypes.number,
  children: PropTypes.node,
  heading: PropTypes.string,
  isLoading: PropTypes.bool,
  isWidget: PropTypes.bool,
  contact: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  alias: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  variant: PropTypes.oneOf(Object.values(TYPOGRAPHY_VARIANT)),
  link: PropTypes.string
}

ViewFormField.defaultProps = {
  gridSize: 12,
  children: null,
  heading: null,
  isLoading: false,
  contact: null,
  isWidget: false,
  variant: TYPOGRAPHY_VARIANT.H4
}

export default memo(ViewFormField)
