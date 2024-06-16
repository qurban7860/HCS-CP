import { useState, useEffect, memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useIcon, Icon, ICON_NAME, useSettingContext } from 'hook'
import { useLocation } from 'react-router-dom'
import { Typography, Chip, IconButton, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox, GStyledPopover, GStyledTooltip } from 'theme/style'
import { SvgFlagIcon, IconTooltip } from 'component'
import { SkeletonViewFormField } from 'component/skeleton'
import { SIZE, VARIANT, KEY, LABEL, FLEX } from 'constant'
import { StyledDefaultTypography, StyledFieldGrid, StyledChipGrid, StyledFieldChip, StyledFlagBox } from './style'

const { TYPOGRAPHY } = VARIANT

const ViewFormField = ({
  children,
  primaryContact,
  node,
  heading,
  variant,
  isLoading,
  gridSize,
  contact,
  isWidget,
  noBreakSpace,
  userRolesChip,
  isNoBg,
  chip,
  phoneChips,
  link,
  isMachineView,
  customerLink,
  country
}) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { themeMode } = useSettingContext()
  const { pathname } = useLocation()
  const theme = useTheme()

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
    <StyledFieldGrid item xs={!isWidget && 12} sm={gridSize} mode={themeMode} isMachineView={isMachineView} isNoBg={isNoBg}>
      <Typography variant={TYPOGRAPHY.OVERLINE0} color="grey.600">
        {heading}
      </Typography>
      {isLoading ? (
        <m.div>
          <SkeletonViewFormField />
        </m.div>
      ) : (
        <Fragment>
          {link ? (
            <GStyledSpanBox>
              <StyledDefaultTypography variant={variant}> &nbsp; {link} </StyledDefaultTypography> &nbsp;
              <GStyledTooltip
                title={LABEL.GO_TO(heading)}
                placement={KEY.RIGHT}
                disableFocusListener
                tooltipcolor={theme.palette.grey[500]}
                color={theme.palette.grey[500]}>
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
              </GStyledTooltip>
            </GStyledSpanBox>
          ) : customerLink ? (
            <GStyledSpanBox style={{ display: FLEX.FLEX, alignItems: 'center', justifyContent: 'space-between' }}>
              <GStyledSpanBox>
                <StyledDefaultTypography variant={variant}>&nbsp;{children}</StyledDefaultTypography>

                <GStyledTooltip
                  title={LABEL.VIEW_IN_NEW_TAB}
                  placement={KEY.RIGHT}
                  disableFocusListener
                  tooltipcolor={theme.palette.grey[500]}
                  color={theme.palette.grey[500]}>
                  <IconButton
                    onClick={() => window.open(customerLink, KEY.BLANK)}
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
                </GStyledTooltip>
              </GStyledSpanBox>
              <StyledFlagBox>
                <SvgFlagIcon
                  country={country}
                  color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.bronze}
                  dimension={16}
                />
              </StyledFlagBox>
            </GStyledSpanBox>
          ) : (
            <StyledDefaultTypography variant={variant}>
              {noBreakSpace ? '' : '\u00A0'} {children}
            </StyledDefaultTypography>
          )}

          {contact && typeof contact === 'object' && contact.length > 0 ? (
            <StyledChipGrid container>
              {contact.map((chip, index) => (
                <StyledFieldChip
                  key={index}
                  mode={themeMode}
                  label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{` ${chip?.firstName || ''} ${chip?.lastName || ''}`}</Typography>}
                  size={SIZE.SMALL}
                />
              ))}
            </StyledChipGrid>
          ) : (
            contact &&
            typeof contact?.firstName === 'string' && <Chip label={`${contact?.firstName || ''} ${contact?.lastName || ''}`} sx={{ m: 0.2 }} />
          )}
          {chip && typeof chip === 'object' && userRolesChip?.length > 0 ? (
            <StyledChipGrid container>
              {chip?.map((c, index) => (
                <StyledFieldChip key={index} mode={themeMode} label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{c}</Typography>} size={SIZE.SMALL} />
              ))}
            </StyledChipGrid>
          ) : (
            chip && typeof chip === 'string' && <Chip label={chip} sx={{ m: 0.2 }} />
          )}

          {Array.isArray(phoneChips) && (
            <StyledChipGrid container>
              {phoneChips?.map((p, index) => (
                <StyledFieldChip
                  key={index}
                  mode={themeMode}
                  label={
                    <GStyledSpanBox>
                      {p.type && (
                        <Typography variant={TYPOGRAPHY.OVERLINE2} fontWeight="bold">
                          {p?.type} &nbsp;
                        </Typography>
                      )}
                      <Typography variant={TYPOGRAPHY.BODY2}>
                        {p?.countryCode && `+${p?.countryCode} `} {p.contactNumber && p.contactNumber}
                        {p.extensions && `(${p.extensions})`}
                      </Typography>
                    </GStyledSpanBox>
                  }
                  size={SIZE.SMALL}
                />
              ))}
            </StyledChipGrid>
          )}
          {primaryContact && (
            <StyledChipGrid container>
              <IconTooltip
                icon={ICON_NAME.CONTACT}
                color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.darkGray}
                iconOnly
                dimension={15}
              />
              {primaryContact}
            </StyledChipGrid>
          )}

          {userRolesChip && typeof userRolesChip === 'object' && userRolesChip.length > 0 ? (
            <StyledChipGrid container>
              {userRolesChip?.map((r, index) => (
                <StyledFieldChip
                  key={index}
                  mode={themeMode}
                  label={<Typography variant={TYPOGRAPHY.OVERLINE2}>{r?.roleType}</Typography>}
                  size={SIZE.SMALL}
                />
              ))}
            </StyledChipGrid>
          ) : (
            userRolesChip && typeof userRolesChip === 'string' && userRolesChip.trim().length > 0 && <Chip label={userRolesChip} sx={{ m: 0.2 }} />
          )}
        </Fragment>
      )}
    </StyledFieldGrid>
  )
}

ViewFormField.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
  node: PropTypes.node,
  gridSize: PropTypes.number,
  isLoading: PropTypes.bool,
  isWidget: PropTypes.bool,
  isNoBg: PropTypes.bool,
  noBreakSpace: PropTypes.bool,
  variant: PropTypes.oneOf(Object.values(TYPOGRAPHY)),
  contact: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  chip: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  phoneChips: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  userRolesChip: PropTypes.array,
  link: PropTypes.string,
  customerLink: PropTypes.string,
  primaryContact: PropTypes.any
}

ViewFormField.defaultProps = {
  gridSize: 12,
  children: null,
  noBreakSpace: false,
  node: null,
  heading: null,
  isLoading: false,
  contact: null,
  isWidget: false,
  variant: TYPOGRAPHY.BODY0
}

export default memo(ViewFormField)
