import { ASSET } from "config/asset-directory"

const FORMAT_PDF         = ['pdf']
const FORMAT_TEXT        = ['txt', 'odt', 'ott', 'rtf', 'csv']
const FORMAT_PHOTOSHOP   = ['psd', 'psb', 'ai', 'tiff']
const FORMAT_WORD        = ['doc', 'docx']
const FORMAT_EXCEL       = ['xls', 'xlsx', 'ods']
const FORMAT_ZIP         = ['zip', 'rar', 'iso']
const FORMAT_ILLUSTRATOR = ['ai', 'esp']
const FORMAT_POWERPOINT  = ['ppt', 'pptx', 'odp']
const FORMAT_AUDIO       = ['wav', 'aif', 'mp3', 'aac']
const FORMAT_IMG_VISIBLE = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'webp', 'ico', 'jpe']
const FORMAT_IMG         = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'webp', 'ico', 'jpe', 'exr', 'hdr', 'pbm', 'pfm', 'pgm', 'pict', 'ppm', 'sgi', 'tga', 'dds', 'cr2', 'dng', 'heic', 'heif', 'jp2', 'nef', 'orf', 'pef', 'raf', 'rw2']
const FORMAT_VIDEO       = ['m4v', 'avi', 'mpg', 'mp4', 'webm']

export function fileFormat(fileUrl) {
 let format

 switch (fileUrl?.includes(fileTypeByUrl(fileUrl))) {
  case FORMAT_TEXT.includes(fileTypeByUrl(fileUrl)):
   format = 'txt'
   break
  case FORMAT_ZIP.includes(fileTypeByUrl(fileUrl)):
   format = 'zip'
   break
  case FORMAT_AUDIO.includes(fileTypeByUrl(fileUrl)):
   format = 'audio'
   break
  case FORMAT_IMG.includes(fileTypeByUrl(fileUrl)):
   format = 'image'
   break
  case FORMAT_IMG_VISIBLE.includes(fileTypeByUrl(fileUrl)):
   format = 'images'
   break
  case FORMAT_VIDEO.includes(fileTypeByUrl(fileUrl)):
   format = 'video'
   break
  case FORMAT_WORD.includes(fileTypeByUrl(fileUrl)):
   format = 'word'
   break
  case FORMAT_EXCEL.includes(fileTypeByUrl(fileUrl)):
   format = 'excel'
   break
  case FORMAT_POWERPOINT.includes(fileTypeByUrl(fileUrl)):
   format = 'powerpoint'
   break
  case FORMAT_PDF.includes(fileTypeByUrl(fileUrl)):
   format = 'pdf'
   break
  case FORMAT_PHOTOSHOP.includes(fileTypeByUrl(fileUrl)):
   format = 'photoshop'
   break
  case FORMAT_ILLUSTRATOR.includes(fileTypeByUrl(fileUrl)):
   format = 'illustrator'
   break
  default:
   format = fileTypeByUrl(fileUrl)
 }
 return format
}

export function fileThumb(fileUrl) {
 let thumb

 switch (fileFormat(fileUrl)) {
  case 'folder':
   thumb = ASSET.THUMB('ic_folder')
   break
  case 'txt':
   thumb = ASSET.THUMB('ic_txt')
   break
  case 'csv':
   thumb = ASSET.THUMB('ic_txt')
   break
  case 'zip':
   thumb = ASSET.THUMB('ic_zip')
   break
  case 'audio':
   thumb = ASSET.THUMB('ic_audio')
   break
  case 'video':
   thumb = ASSET.THUMB('ic_video')
   break
  case 'word':
   thumb = ASSET.THUMB('ic_word')
   break
  case 'excel':
   thumb = ASSET.THUMB('ic_excel')
   break
  case 'powerpoint':
   thumb = ASSET.THUMB('ic_power_point')
   break
  case 'pdf':
   thumb = ASSET.THUMB('ic_pdf')
   break
  case 'photoshop':
   thumb = ASSET.THUMB('ic_pts')
   break
  case 'illustrator':
   thumb = ASSET.THUMB('ic_ai')
   break
  case 'image':
   thumb = ASSET.THUMB('ic_img')
   break
  default:
   thumb = ASSET.THUMB('ic_file')
 }
 return thumb
}

export function fileTypeByUrl(fileUrl = '') {
 return (fileUrl && fileUrl.split('.').pop()) || ''
}

export function fileNameByUrl(fileUrl) {
 return fileUrl.split('/').pop()
}

export function fileData(file) {
 if (typeof file === 'string') {
  return {
   key    : file?.key || file?._id || file,
   preview: file,
   name   : fileNameByUrl(file),
   type   : fileTypeByUrl(file)
  }
 }

 return {
  key             : file?.key || file?._id || file.preview,
  name            : file.name,
  size            : file.size,
  path            : file.path,
  type            : file.type,
  preview         : file.preview,
  lastModified    : file.lastModified,
  lastModifiedDate: file.lastModifiedDate,
  docCategory     : file.docCategory,
  docType         : file.docType,
  versionNo       : file.versionNo,
  displayName     : file.displayName,
  referenceNumber : file.referenceNumber,
  stockNumber     : file.stockNumber
 }
}
