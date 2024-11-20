function _background(image) {
 return `/asset/background/${image}`
}

function _brand(image) {
 return `/asset/brand/${image}`
}

function _sponsor(image) {
 return `/asset/brand/other/${image}`
}

function _image(image) {
 return `/asset/image/${image}`
}

function _svg(image) {
 return `/asset/svg/${image}`
}

function _icon(image) {
 return `/asset/icon/${image}`
}

export const ASSET = {
 BG_LOGO: _background('howick-logo.svg'),
 BG_DARK_LOGO: _background('howick-logo-dark.svg'),
 BG_STROKE_LOGO: _background('howick-logo-stroke.svg'),
 BG_STROKE_GREY_LOGO: _background('howick-logo-stroke-grey.svg'),
 BG_STROKE_SNACK_LOGO: _background('howick-logo-stroke-cyan_snack.svg'),
 BG_STROKE_DARKGREY_LOGO: _background('howick-logo-stroke-dark-grey.svg'),
 BG_STROKE_LIGHTGREY_LOGO: _background('howick-logo-stroke-light-grey.svg'),
 BG_STROKE_BRONZE_LOGO: _background('howick-logo-stroke-bronze.svg'),
 BRAND_LOGO_FULL: _brand('logo.svg'),
 COMPANY_HOWICK: _sponsor('howick.png'),
 COMPANY_HOWICK_DM: _sponsor('howick-dm.png'),
 COMPANY_RFS: _sponsor('rfs.png'),
 COMPANY_RFS_DM: _sponsor('rfs-dm.png'),
 COMPANY_CFS: _sponsor('cfs.svg'),
 COMPANY_CFS_DM: _sponsor('cfs-dm.svg'),
 EVENT_STEEL_HORIZONS: _sponsor('steelhorizons.png'),
 BRAND_TIPABIN: _sponsor('tipabin.png'),
 BRAND_TIPABIN_2: _sponsor('tipabin-2.svg'),
 BRAND_TIPABIN_2_DM: _sponsor('tipabin-2-dm.svg'),
 BRAND_FRAMA: _sponsor('frama.svg'),
 BRAND_FRAMA_DM: _sponsor('frama-dm.svg'),
 BRAND_XCALIBR: _sponsor('xcalibr.png'),
 BRAND_XCALIBR_DM: _sponsor('xcalibr-dm.svg'),
 BRAND_XTENDA: _sponsor('xtenda.png'),
 BRAND_XTENDA_DM: _sponsor('xtenda-dm.png'),
 BRAND_SPEEDFLOOR: _sponsor('speedfloor.png'),
 BRAND_SPEEDFLOOR_DM: _sponsor('speedfloor-dm.png'),
 DECOILER_1_5T: _icon('decoiler_1-5t.svg'),
 DECOILER_3T: _icon('decoiler_3t.svg'),
 DECOILER_5T: _icon('decoiler_5t.svg'),
 DECOILER_6T: _icon('decoiler_6t.svg'),
 FRAMA: _icon('frama-def-1.svg'),
 HOWICK_PORTAL_L2: _brand('howick-portal-l2.svg'),
 HOWICK_PORTAL_L2_DARK: _brand('howick-portal-l2-darkmode-eggshell.svg'),
 HOWICK_PORTAL: _brand('howick-portal-4.svg'),
 HOWICK_PORTAL_DARK: _brand('howick-portal-dark.svg'),
 HOWICK_PORTAL_DARK_2: _brand('howick-portal-3.svg'),
 MAP_MARKER: _brand('howick-map-marker.svg'),
 NZ_MADE: _sponsor('nz-made.png'),
 ICON: _brand('icon.svg'),
 LOGO: _brand('logo.svg'),
 LOGO_DARK: _brand('logo-dark.svg'),
 TRANSPARENT: _image('transparent.png'),
 PARENT: _icon('parent.svg'),
 PLACEHOLDER: _image('placeholder.svg'),
 PORTAL: _brand('portal.svg'),
 PORTAL_2: _brand('portal-2.svg'),
 OCTICON: icon => `/asset/octicon/${icon}.svg`,
 SVG: icon => `/asset/svg/${icon}.svg`
}
