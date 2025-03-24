import { SvgColor } from 'component/svg-color'

export const octicon = (icon) => (
  <SvgColor icon={`/asset/octicon/${icon}/`} alt={icon} sx={{ width: 1, height: 1 }} />
)

export const ICON = {
  customer: octicon('customer'),
  machine: octicon('machine'),
  document: octicon('document'),
}
