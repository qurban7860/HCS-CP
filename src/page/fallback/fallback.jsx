import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { LogoGrayProps, GStyledFallbackWrapperGrid } from 'theme/style'
import { MotionContainer } from 'component/animate'
import { FallbackTitle, FallbackMessage, FallbackButton } from 'section/fallback'
import { Logo } from 'component/logo'
import { HTTP_CODE, LOCAL_STORAGE_KEY } from 'constant'

const Fallback = ({ code, title, message }) => {
  const configurations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.CONFIGURATION))
  const content = configurations?.find((config) => config.type === LOCAL_STORAGE_KEY.ERROR_PAGE && config.name === code)
  const defaultValue = useMemo(
    () => ({
      title: content?.value || title,
      message: content?.notes || message,
    }),
    [content?.value, content?.notes]
  )
  return (
    <MotionContainer>
      <GStyledFallbackWrapperGrid>
        <FallbackTitle value={defaultValue} />
        <Logo sx={LogoGrayProps} />
        <FallbackMessage value={defaultValue} code={code} />
        <FallbackButton />
      </GStyledFallbackWrapperGrid>
    </MotionContainer>
  )
}

Fallback.propTypes = {
  code: PropTypes.number || PropTypes.oneOf(Object.values(HTTP_CODE)),
  title: PropTypes.string,
  message: PropTypes.string,
}

export default Fallback
