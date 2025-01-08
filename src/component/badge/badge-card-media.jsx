import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Badge, Chip } from '@mui/material'
import { CustomAvatar } from 'component'
import { Icon, ICON_NAME } from 'hook'
import { RADIUS } from 'config/layout'
import { KEY, SIZE, VARIANT } from 'constant'

const BadgeCardMedia = ({ dimension = 70, customer, typographyVariant, user }) => {
 const [hoverBadge, setHoverBadge] = useState(false)
 const fileInput = useRef(null)

 const handleHoverBadge = () => {
  setHoverBadge(!hoverBadge)
 }

 const handleFileChange = event => {
  const file = event.target.files[0]
  console.log(file)
 }

 return (
  <m.div>
   <input accept='image/*' type='file' ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
   <Badge
    // onMouseEnter={handleHoverBadge}
    // onMouseLeave={handleHoverBadge}
    overlap='circular'
    anchorOrigin={{ vertical: KEY.TOP, horizontal: KEY.RIGHT }}
    badgeContent={
     <Chip
      icon={<Icon icon={ICON_NAME.EDIT} color='common.black' width={15} />}
      size={SIZE.SMALL}
      variant={VARIANT.OUTLINED}
      onClick={() => {
       fileInput.current.click()
      }}
      sx={{
       borderColor: 'common.white',
       color: 'success.main',
       fontWeight: 'bold',
       cursor: 'pointer',
       display: hoverBadge ? 'block' : 'none'
      }}
     />
    }>
    {/* use for #1584 */}
    {/* <CardMedia
     component={COMPONENT.IMG}
     src={mockUser[0].badge}
     alt={mockUser[0]?.organization}
     sx={{
      objectFit: 'hidden',
      borderRadius: '5%',
      marginRight: 2,
      height: dimension,
      width: dimension
     }}> */}
    <CustomAvatar
     /**src={mockUser[0]?.photoURL}  */ alt={'display name'}
     name={customer?.name || user?.name}
     value
     typography={typographyVariant}
     sx={{
      objectFit: 'hidden',
      borderRadius: RADIUS.BORDER.borderRadius,
      marginRight: 2,
      height: dimension,
      width: dimension
     }}
    />
    {/* </CardMedia> */}
   </Badge>
  </m.div>
 )
}

BadgeCardMedia.propTypes = {
 dimension: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
 typographyVariant: PropTypes.string,
 customer: PropTypes.object,
 user: PropTypes.object
}

export default BadgeCardMedia
