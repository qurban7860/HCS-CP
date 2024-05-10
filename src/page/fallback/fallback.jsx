import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIcon, ICON_NAME } from 'hook'
import { Box } from '@mui/material'
import { MotionContainer } from 'component/animate'
import { FallbackTitle, FallbackMessage, FallbackButton } from 'section/fallback'
import { Logo } from 'component/logo'
import { LogoGrayProps, GStyledFallbackWrapperGrid, motionRelativeBoxOption, iconPropsOption } from 'theme/style'
import { HTTP_CODE, LOCAL_STORAGE_KEY, FALLBACK } from 'constant'

const { code: CODE } = FALLBACK.UNDER_DEVELOPMENT

const Fallback = ({ code, title, message }) => {
  const configurations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.CONFIGURATION))
  const content = configurations?.find((config) => config.type === LOCAL_STORAGE_KEY.ERROR_PAGE && config.name === code)
  const defaultValue = useMemo(
    () => ({
      title: content?.value || title,
      message: content?.notes || message
    }),
    [content?.value, content?.notes]
  )

  const { Icon, iconSrc: trafficCone } = useIcon(ICON_NAME.TRAFFIC_CONE)
  const isUnderDevelopment = code === CODE

  return (
    <MotionContainer>
      <GStyledFallbackWrapperGrid>
        <FallbackTitle value={defaultValue} />
        <Logo sx={LogoGrayProps} />
        {isUnderDevelopment && (
          <Icon
            icon={trafficCone}
            color="howick.orange"
            sx={{
              height: 40,
              width: 40
            }}
          />
        )}
        <FallbackMessage value={defaultValue} code={code} />
        <FallbackButton />
      </GStyledFallbackWrapperGrid>
    </MotionContainer>
  )
}

Fallback.propTypes = {
  code: PropTypes.oneOf(Object.values(HTTP_CODE)),
  title: PropTypes.string,
  message: PropTypes.string
}

export default Fallback
