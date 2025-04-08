import { useState, useEffect, memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import ReactQuill from 'react-quill';
import { useIcon, ICON_NAME, useSettingContext, useResponsive } from 'hook'
import { useLocation } from 'react-router-dom'
import { Typography, Chip, IconButton, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledSpanBox, GStyledTooltip } from 'theme/style'
import { SvgFlagIcon, IconTooltip } from 'component'
import { SkeletonViewFormField } from 'component/skeleton'
import { RADIUS } from 'config/layout'
import { SIZE, VARIANT, KEY, LABEL, FLEX } from 'constant'
import { roleCoverUp } from 'util/role'
import { StyledDefaultTypography, StyledFieldGrid, StyledChipGrid, StyledFieldChip, StyledFlagBox } from './style'
import './react-quill.css'


const { TYPOGRAPHY } = VARIANT

const ViewFormField = ({
    children = null,
    isEditor = false,
    primaryContact,
    heading = null,
    variant = TYPOGRAPHY.BODY1,
    isLoading = false,
    gridSize = 12,
    contact = null,
    isWidget = false,
    noBreakSpace = false,
    userRolesChip,
    rolesChip,
    isNoBg,
    chip,
    phoneChips,
    link,
    isMachineView,
    customerLink,
    country,
    multiline,
    height,
    minHeight,
    alignItems
}) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const { themeMode } = useSettingContext()
    const { pathname } = useLocation()
    const theme = useTheme()
    const isMobile = useResponsive('down', 'sm')
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const { Icon: WebIcon, iconSrc: openInSrc } = useIcon(ICON_NAME.OPEN_IN_NEW)

    useEffect(() => {
        if (open) {
            handleClose()
        }
    }, [pathname])

    const handleOpen = event => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <Typography variant={isMobile ? TYPOGRAPHY.OVERLINE : TYPOGRAPHY.OVERLINE0} color={themeMode === KEY.LIGHT ? theme.palette.grey[700] : theme.palette.grey[300]}>
                {heading}
            </Typography>
            <StyledFieldGrid item xs={!isWidget && 12} sm={gridSize} mode={themeMode} isMachineView={isMachineView} isNoBg={isNoBg} isMobile={isMobile} height={height} minHeight={minHeight} alignItems={alignItems}>
                {isLoading ? (
                    <m.div>
                        <SkeletonViewFormField />
                    </m.div>
                ) : (
                    <Fragment>
                        {link ? (
                            <GStyledSpanBox>
                                <StyledDefaultTypography variant={variant}> &nbsp; {link} </StyledDefaultTypography> &nbsp;
                                <GStyledTooltip title={LABEL.GO_TO(heading)} placement={KEY.RIGHT} disableFocusListener tooltipcolor={theme.palette.grey[500]} color={theme.palette.grey[500]}>
                                    <IconButton
                                        onClick={() => window.open(`https://` + link, KEY.BLANK)}
                                        size={SIZE.MEDIUM}
                                        color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                                        onMouseEnter={handleOpen}
                                        onMouseLeave={handleClose}
                                        aria-label='view'
                                        target={KEY.BLANK}
                                        sx={{
                                            padding: 0.5,
                                            m: 0,
                                            ...RADIUS.BORDER
                                        }}>
                                        <WebIcon icon={openInSrc} width={15} />
                                    </IconButton>
                                </GStyledTooltip>
                            </GStyledSpanBox>
                        ) : customerLink ? (
                            <GStyledSpanBox style={{ display: FLEX.FLEX, alignItems: 'center', justifyContent: 'space-between' }}>
                                <GStyledSpanBox>
                                    <StyledDefaultTypography variant={variant}>&nbsp;{children}</StyledDefaultTypography>

                                    <GStyledTooltip title={LABEL.VIEW_IN_NEW_TAB} placement={KEY.RIGHT} disableFocusListener tooltipcolor={theme.palette.grey[500]} color={theme.palette.grey[500]}>
                                        <IconButton
                                            onClick={() => window.open(customerLink, KEY.BLANK)}
                                            size={SIZE.MEDIUM}
                                            color={themeMode === KEY.LIGHT ? 'grey.800' : 'common.white'}
                                            onMouseEnter={handleOpen}
                                            onMouseLeave={handleClose}
                                            aria-label='view'
                                            target={KEY.BLANK}
                                            sx={{
                                                padding: 0.5,
                                                m: 0,
                                                ...RADIUS.BORDER
                                            }}>
                                            <WebIcon icon={openInSrc} width={15} />
                                        </IconButton>
                                    </GStyledTooltip>
                                </GStyledSpanBox>
                                <StyledFlagBox>
                                    <SvgFlagIcon country={country} color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.bronze} dimension={16} />
                                </StyledFlagBox>
                            </GStyledSpanBox>
                        ) : multiline ? (
                            <m.div>
                                {isEditor ?
                                    <ReactQuill value={children} readOnly modules={{ toolbar: null }}
                                        style={{ width: '100%', minHeight: 'auto', border: 'none' }}
                                    />
                                    : <StyledDefaultTypography variant={variant} sx={{ whiteSpace: 'pre-line' }}>
                                        {noBreakSpace ? '' : '\u00A0'} {children}
                                    </StyledDefaultTypography>}
                            </m.div>
                        ) : (
                            // default
                            <m.div>
                                <StyledDefaultTypography variant={variant}>
                                    {noBreakSpace ? '' : '\u00A0'} {children}
                                </StyledDefaultTypography>
                            </m.div>
                        )}

                        {contact && typeof contact === 'object' && contact.length > 0 ? (
                            <StyledChipGrid container isNoBg={isNoBg} mode={themeMode}>
                                {contact.map((chip, index) => (
                                    <StyledFieldChip
                                        key={index}
                                        mode={themeMode}
                                        label={<Typography variant={TYPOGRAPHY.CAPTION}>{` ${chip?.firstName || ''} ${chip?.lastName || ''}`}</Typography>}
                                        size={SIZE.SMALL}
                                    />
                                ))}
                            </StyledChipGrid>
                        ) : (
                            contact && typeof contact?.firstName === 'string' && <Chip label={`${contact?.firstName || ''} ${contact?.lastName || ''}`} sx={{ m: 0.2 }} />
                        )}

                        {chip && typeof chip === 'object' && userRolesChip?.length > 0 ? (
                            <StyledChipGrid container mode={themeMode} isNoBg>
                                {chip?.map((c, index) => (
                                    <StyledFieldChip key={index} mode={themeMode} label={<Typography variant={TYPOGRAPHY.CAPTION}>{c}</Typography>} size={SIZE.SMALL} />
                                ))}
                            </StyledChipGrid>
                        ) : Array.isArray(chip) ? (
                            <StyledChipGrid container mode={themeMode} isNoBg>
                                {chip?.map((c, index) => (
                                    <StyledFieldChip key={index} mode={themeMode} label={<Typography variant={TYPOGRAPHY.CAPTION}>{c}</Typography>} size={SIZE.SMALL} />
                                ))}
                            </StyledChipGrid>
                        ) : (
                            chip && typeof chip === 'string' && <Chip label={chip} sx={{ m: 0.2 }} />
                        )}

                        {Array.isArray(phoneChips) && (
                            <StyledChipGrid container mode={themeMode} isNoBg>
                                {phoneChips?.map((p, index) => (
                                    <StyledFieldChip
                                        key={index}
                                        mode={themeMode}
                                        label={
                                            <GStyledSpanBox>
                                                {p?.type && (
                                                    <Typography variant={TYPOGRAPHY.CAPTION}>
                                                        {p?.type} &nbsp;
                                                    </Typography>
                                                )}
                                                <Typography variant={TYPOGRAPHY.CAPTION}>
                                                    {p?.countryCode && `+${p?.countryCode} `} {p?.contactNumber && p?.contactNumber}
                                                    {p?.extensions && `(${p?.extensions})`}
                                                </Typography>
                                            </GStyledSpanBox>
                                        }
                                        size={SIZE.SMALL}
                                    />
                                ))}
                            </StyledChipGrid>
                        )}

                        {primaryContact && primaryContact !== '' ? (
                            <StyledChipGrid container gap={1} isNoBg mode={themeMode}>
                                <IconTooltip icon={ICON_NAME.CONTACT} color={themeMode === KEY.LIGHT ? theme.palette.howick.blue : theme.palette.howick.orange} iconOnly dimension={15} />
                                {primaryContact}
                            </StyledChipGrid>
                        ) : (
                            primaryContact === '' && (
                                <StyledChipGrid container isNoBg mode={themeMode}>
                                    <IconTooltip icon={ICON_NAME.CONTACT} color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.howick.darkGray} iconOnly dimension={15} />
                                </StyledChipGrid>
                            )
                        )}

                        {userRolesChip && typeof userRolesChip === 'object' && userRolesChip.length > 0 ? (
                            <StyledChipGrid container mode={themeMode} isNoBg>
                                {userRolesChip?.map((r, index) => (
                                    <StyledFieldChip key={index} mode={themeMode} label={<Typography variant={isDesktop ? TYPOGRAPHY.OVERLINE2 : TYPOGRAPHY.OVERLINE}>{r}</Typography>} size={SIZE.SMALL} />
                                ))}
                            </StyledChipGrid>
                        ) : (
                            userRolesChip && typeof userRolesChip === 'string' && userRolesChip.trim().length > 0 && <Chip label={userRolesChip} sx={{ m: 0.2 }} />
                        )}

                        {rolesChip && Array.isArray(rolesChip) && rolesChip.length > 0 && (
                            <StyledChipGrid container mode={themeMode} isNoBg>
                                &nbsp;
                                {rolesChip?.map((r, index) => (
                                    <StyledFieldChip key={index} mode={themeMode} label={<Typography variant={TYPOGRAPHY.CAPTION}>{roleCoverUp(r)}</Typography>} size={SIZE.SMALL} />
                                ))}
                            </StyledChipGrid>
                        )}
                    </Fragment>
                )}
            </StyledFieldGrid>
        </Fragment>
    )
}

ViewFormField.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
    node: PropTypes.node,
    gridSize: PropTypes.number,
    isLoading: PropTypes.bool,
    isEditor: PropTypes.bool,
    isWidget: PropTypes.bool,
    isNoBg: PropTypes.bool,
    noBreakSpace: PropTypes.bool,
    variant: PropTypes.oneOf(Object.values(TYPOGRAPHY)),
    contact: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    chip: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    phoneChips: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    userRolesChip: PropTypes.any,
    rolesChip: PropTypes.array,
    link: PropTypes.string,
    customerLink: PropTypes.string,
    primaryContact: PropTypes.any,
    isMachineView: PropTypes.bool,
    country: PropTypes.string,
    multiline: PropTypes.bool,
    height: PropTypes.string,
    minHeight: PropTypes.string,
    alignItems: PropTypes.string
}

export default memo(ViewFormField)
