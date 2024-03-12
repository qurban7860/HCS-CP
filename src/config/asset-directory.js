function _background(image) {
  return `/asset/background/${image}`
}

function _brand(image) {
  return `/asset/brand/${image}`
}

function _sponsor(image) {
  return `/asset/other/${image}`
}

const ASSET = {
  BG_LOGO: _background('howick-logo-2.svg'),
  BRAND_LOGO_FULL: _brand('logo.svg'),
  COMPANY_HOWICK: _sponsor('howick.png'),
  COMPANY_RFS: _sponsor('rfs.png'),
  COMPANY_CFS: _sponsor('cfs.svg'),
  EVENT_STEEL_HORIZONS: _sponsor('steelhorizons.png'),
  BRAND_TIPABIN: _sponsor('tipabin.png'),
  BRAND_FRAMA: _sponsor('frama.svg'),
  BRAND_XCALIBR: _sponsor('xcalibr.png'),
  BRAND_XTENDA: _sponsor('xtenda.png'),
  BRAND_SPEEDFLOOR: _sponsor('speedfloor.png'),
  ICON: _brand('icon.svg'),
  LOGO: '/asset/brand/logo.svg',
  OCTICON: (icon) => `/asset/octicon/${icon}.svg`,
  SVG: (icon) => `/asset/svg/${icon}.svg`,
}

export default ASSET
