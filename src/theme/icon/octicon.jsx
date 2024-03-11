import { ASSET } from 'config'
import { SvgColor } from 'component/svg-color'
import { Iconify } from 'component/iconify'

export const octicon = (icon) => (
  <SvgColor src={`/asset/octicon/${icon}/`} alt={icon} sx={{ width: 1, height: 1 }} />
)

export const ICON = {
  customer: octicon('customer'),
  machine: octicon('machine'),
  document: octicon('document'),
}
