import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { ICON_NAME, useSettingContext, Icon } from 'hook'
import { Box, Badge, Chip } from '@mui/material'
import { CustomAvatar } from 'component'
import { RADIUS } from 'config'
import { KEY, FLEX } from 'constant'

const ProfileAvatar = ({ value }) => {
  const [hoverAvatar, setHoverAvatar] = useState(false)
  const [hoverBadge, setHoverBadge] = useState(false)
  const { themeMode } = useSettingContext()

  const fileInput = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
  }

  const handleHoverAvatar = () => {
    setHoverAvatar((prev) => !prev)
  }

  return (
    <Box display={FLEX.FLEX} justifyContent={KEY.CENTER}>
      <input accept="image/*" type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
      <Badge
        onMouseEnter={handleHoverAvatar}
        onMouseLeave={handleHoverAvatar}
        overlap="circular"
        anchorOrigin={{ vertical: KEY.TOP, horizontal: KEY.RIGHT }}
        badgeContent={
          <Chip
            icon={<Icon icon={ICON_NAME.EDIT} color="common.white" width={30} />}
            size="large"
            variant="filled"
            onClick={() => {
              fileInput.current.click()
            }}
            sx={{
              borderColor: 'common.white',
              color: 'success.main',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: hoverAvatar ? 'block' : 'none'
            }}
          />
        }>
        <CustomAvatar
          // src={defaultValues?.fullName}
          alt={value?.name}
          name={value?.name}
          sx={{
            width: 250,
            height: 250,
            borderRadius: RADIUS.BORDER_RADIUS,
            borderColor: themeMode === KEY.LIGHT ? 'success.main' : 'grey.400',
            borderWidth: 5
          }}
          justName
        />
      </Badge>
    </Box>
  )
}

ProfileAvatar.propTypes = {
  value: PropTypes.object
}

export default ProfileAvatar
