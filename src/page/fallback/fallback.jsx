import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME, useSettingContext } from 'hook'
import { useTheme } from '@mui/material/styles'
import { LogoGrayProps, GStyledFallbackWrapperGrid, GStyledBgMain } from 'theme/style'
import { MotionContainer, Logo } from 'component'
import { FallbackTitle, FallbackMessage, FallbackButton } from 'section/fallback'
import { HTTP_CODE, LOCAL_STORAGE_KEY, FALLBACK } from 'constant'

const { code: CODE } = FALLBACK.UNDER_DEVELOPMENT

const Fallback = ({ code, title, message }) => {
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const configurations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.CONFIGURATION))
  const content = configurations?.find((config) => config.type === LOCAL_STORAGE_KEY.ERROR_PAGE && config.name === code)
  const defaultValue = useMemo(
    () => ({
      title: content?.value || title,
      message: content?.notes || message
    }),
    [content?.value, content?.notes]
  )

  const isUnderDevelopment = code === CODE

  return (
    <MotionContainer>
      <GStyledBgMain mode={themeMode}>
        <GStyledFallbackWrapperGrid>
          <FallbackTitle value={defaultValue} />
          <Logo sx={LogoGrayProps} />
          {isUnderDevelopment && (
            <Icon
              icon={ICON_NAME.TRAFFIC_CONE}
              color={theme.palette.howick.orange}
              sx={{
                height: 40,
                width: 40
              }}
            />
          )}
          <FallbackMessage value={defaultValue} code={code} />
          <FallbackButton />
        </GStyledFallbackWrapperGrid>
      </GStyledBgMain>
    </MotionContainer>
  )
}

Fallback.propTypes = {
  code: PropTypes.oneOf(Object.values(HTTP_CODE)),
  title: PropTypes.string,
  message: PropTypes.string
}

export default Fallback
