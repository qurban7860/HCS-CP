import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { m } from 'framer-motion'
import { Badge, CardMedia, Chip } from '@mui/material'
import { useIcon, ICON_NAME } from 'hook'
import { mockUser } from '_mock'
import { KEY, COMPONENT, SIZE, VARIANT } from 'constant'
import { BADGE } from 'config/layout'

const BadgeCardMedia = ({ dimension }) => {
  const [hoverBadge, setHoverBadge] = useState(false)
  const { Icon, iconSrc: editSrc } = useIcon(ICON_NAME.EDIT)
  const fileInput = useRef(null)

  const handleHoverBadge = () => {
    setHoverBadge(!hoverBadge)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
  }

  return (
    <m.div>
      <input accept="image/*" type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
      <Badge
        onMouseEnter={handleHoverBadge}
        onMouseLeave={handleHoverBadge}
        overlap="circular"
        anchorOrigin={{ vertical: KEY.TOP, horizontal: KEY.RIGHT }}
        badgeContent={
          <Chip
            icon={<Icon icon={editSrc} color="common.black" width={15} />}
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
        <CardMedia
          component={COMPONENT.IMG}
          src={mockUser[0].badge}
          alt={mockUser[0]?.organization}
          sx={{
            objectFit: 'hidden',
            borderRadius: '5%',
            marginRight: 2,
            height: dimension,
            width: dimension
          }}
        />
      </Badge>
    </m.div>
  )
}

BadgeCardMedia.propTypes = {
  dimension: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

BadgeCardMedia.defaultProps = {
  dimension: 70
}

export default BadgeCardMedia
