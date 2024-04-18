import { ASSET } from 'config'
import KEY from './key'

export const PRODUCT = [
  { name: 'frama', image: (isDark) => (isDark === KEY.DARK ? ASSET.BRAND_FRAMA_DM : ASSET.BRAND_FRAMA) },
  { name: 'xcalibr', image: (isDark) => (isDark === KEY.DARK ? ASSET.BRAND_XCALIBR_DM : ASSET.BRAND_XCALIBR) },
  { name: 'xtenda', image: (isDark) => (isDark === KEY.DARK ? ASSET.BRAND_XTENDA_DM : ASSET.BRAND_XTENDA) },
  { name: 'speedfloor', image: (isDark) => (isDark === KEY.DARK ? ASSET.BRAND_SPEEDFLOOR_DM : ASSET.BRAND_SPEEDFLOOR) },
  { name: 'tipabin', image: (isDark) => (isDark === KEY.DARK ? ASSET.BRAND_TIPABIN_2_DM : ASSET.BRAND_TIPABIN_2) }
]

export const COMPANY = [
  { name: 'howick', image: (isDark) => (isDark === KEY.DARK ? ASSET.COMPANY_HOWICK_DM : ASSET.COMPANY_HOWICK) },
  { name: 'rfs', image: (isDark) => (isDark === KEY.DARK ? ASSET.COMPANY_RFS_DM : ASSET.COMPANY_RFS) },
  { name: 'cfs', image: (isDark) => (isDark === KEY.DARK ? ASSET.COMPANY_CFS_DM : ASSET.COMPANY_CFS) }
]

export const EVENT = [{ name: 'steelhorizons', image: ASSET.EVENT_STEEL_HORIZONS }]
