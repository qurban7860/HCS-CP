import { useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import { LogoGrayProps, StyledFallbackWrapperGrid } from 'theme/style'
import { MotionContainer } from 'component/animate'
import { Logo } from 'component/logo'
import { DIALOG } from 'constant'
import { FallbackTitle, FallbackMessage, FallbackButton } from 'section/fallback'

function NotFound() {
  const configurations = JSON.parse(localStorage.getItem('configurations'))
  const content = configurations?.find(
    (config) => config.type === 'ERROR-PAGES' && config.name === '404'
  )
  const defaultValue = useMemo(
    () => ({
      title: content?.value || DIALOG.NOT_FOUND.title,
      message: content?.notes || DIALOG.NOT_FOUND.message,
    }),
    [content?.value, content?.notes]
  )

  return (
    <MotionContainer>
      <StyledFallbackWrapperGrid>
        <FallbackTitle value={defaultValue} />
        <Logo sx={LogoGrayProps} />
        <FallbackMessage value={defaultValue} />
        <FallbackButton />
      </StyledFallbackWrapperGrid>
    </MotionContainer>
  )
}

export default NotFound
