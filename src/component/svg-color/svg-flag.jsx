import { SvgIcon } from '@mui/material'

function _getCountryIcon(icon) {
  return `/asset/svg/flag/${icon}.svg`
}

const SvgFlagIcon = ({ country, dimension = 40, ...other }) => {
  return (
    <img
      src={_getCountryIcon(country)}
      alt={country + 'icon'}
      {...other}
      style={{
        borderRadius: 10
      }}
    />
  )
}

export default SvgFlagIcon
