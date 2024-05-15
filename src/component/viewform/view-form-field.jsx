import { memo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { useSettingContext } from 'component/setting'
import { Typography, Grid, Chip } from '@mui/material'
import { SkeletonViewFormField } from 'component/skeleton'
import { TYPOGRAPHY_VARIANT, SIZE, VARIANT } from 'constant'
import { StyledDefaultTypography, StyledFieldGrid, StyledChipGrid, StyledFieldChip } from './style'

const { TYPOGRAPHY } = VARIANT

const ViewFormField = ({ children, heading, variant, isLoading, gridSize, contact, isWidget, isOrg, alias }) => {
  const { themeMode } = useSettingContext()

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
          <StyledDefaultTypography variant={variant}>&nbsp;{children}</StyledDefaultTypography>
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
  variant: PropTypes.oneOf(Object.values(TYPOGRAPHY_VARIANT))
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
