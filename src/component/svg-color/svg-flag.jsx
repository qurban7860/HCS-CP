import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import { useSettingContext } from 'component/setting'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { GStyledTooltip } from 'theme/style'

countries.registerLocale(enLocale)

function _getCountryIcon(country) {
  const countryCode = countries.getAlpha2Code(country, 'en')?.toLocaleLowerCase()
  return `/asset/svg/flag/${countryCode}.svg`
}

const SvgFlagIcon = ({ country, dimension = 24, color, ...other }) => {
  return (
    country !== undefined && (
      <Button
        variant="filled"
        sx={{
          cursor: 'default',
          color,
          borderColor: color
        }}
        {...other}>
        <GStyledTooltip title={country} placement="top" disableFocusListener tooltipcolor={color} color={color}>
          <img src={_getCountryIcon(country)} alt={country} style={{ borderRadius: 2 }} />
        </GStyledTooltip>
      </Button>
    )
  )
}

export default SvgFlagIcon
