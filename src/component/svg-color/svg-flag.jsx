import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

import { GStyledTooltip } from 'theme/style'

countries.registerLocale(enLocale)

function _getCountryIcon(country) {
  const countryCode = countries.getAlpha2Code(country, 'en')?.toLocaleLowerCase()
  return `/asset/svg/flag/${countryCode}.svg`
}

const SvgFlagIcon = ({ country, dimension = 24, color = '#FFF', ...other }) => {
  return (
    country !== undefined && (
      // <Button
      //   variant="filled"
      //   sx={{
      //     cursor: 'default',
      //     borderColor: color,
      //     padding: 0.4
      //   }}
      //   {...other}>

      <GStyledTooltip title={country} placement="top" disableFocusListener tooltipcolor={color} color={color}>
        <img src={_getCountryIcon(country)} alt={country} style={{ borderRadius: 2, height: dimension }} />
      </GStyledTooltip>

      // </Button>
    )
  )
}

export default SvgFlagIcon
