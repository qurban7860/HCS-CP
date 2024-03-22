function _background(image) {
  return `/asset/background/${image}`
}

function _brand(image) {
  return `/asset/brand/${image}`
}

function _sponsor(image) {
  return `/asset/brand/other/${image}`
}

const ASSET = {
  BG_LOGO: _background('howick-logo.svg'),
  BG_DARK_LOGO: _background('howick-logo-dark.svg'),
  BG_STROKE_LOGO: _background('howick-logo-stroke.svg'),
  BG_STROKE_GREY_LOGO: _background('howick-logo-stroke-grey.svg'),
  BG_STROKE_BRONZE_LOGO: _background('howick-logo-stroke-bronze.svg'),
  BRAND_LOGO_FULL: _brand('logo.svg'),
  COMPANY_HOWICK: _sponsor('howick.png'),
  COMPANY_RFS: _sponsor('rfs.png'),
  COMPANY_CFS: _sponsor('cfs.svg'),
  EVENT_STEEL_HORIZONS: _sponsor('steelhorizons.png'),
  BRAND_TIPABIN: _sponsor('tipabin.png'),
  BRAND_TIPABIN_2: _sponsor('tipabin-2.svg'),
  BRAND_FRAMA: _sponsor('frama.svg'),
  BRAND_XCALIBR: _sponsor('xcalibr.png'),
  BRAND_XTENDA: _sponsor('xtenda.png'),
  BRAND_SPEEDFLOOR: _sponsor('speedfloor.png'),
  NZ_MADE: _sponsor('nz-made.png'),
  ICON: _brand('icon.svg'),
  LOGO: '/asset/brand/logo.svg',
  OCTICON: (icon) => `/asset/octicon/${icon}.svg`,
  SVG: (icon) => `/asset/svg/${icon}.svg`,
}

export default ASSET
