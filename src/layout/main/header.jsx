import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, Button, AppBar, Toolbar, Container, Link } from '@mui/material'
import { useResponsive, useOffSetTop } from 'hook'
import { bgBlur } from 'util/style'
import { HEADER } from 'config'
import { PATH_DOCS, PATH_MINIMAL_ON_STORE } from 'route/path'
import { Logo } from 'component/logo'
// import Label from '../../components/label'
import { navConfig, NavMobile, NavDesktop } from 'layout/main'

export default function Header() {
  const carouselRef = useRef(null)

  const theme = useTheme()

  const isDesktop = useResponsive('up', 'md')

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP)

  return (
    <AppBar ref={carouselRef} color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Link
            href={PATH_DOCS.changelog}
            target="_blank"
            rel="noopener"
            underline="none"
            sx={{ ml: 1 }}
          >
            <Label color="info"> v4.1.0 </Label>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}

          <Button variant="contained" target="_blank" rel="noopener" href={PATH_MINIMAL_ON_STORE}>
            Purchase Now
          </Button>

          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  )
}

Shadow.propTypes = {
  sx: PropTypes.object,
}

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadow.z8,
        ...sx,
      }}
      {...other}
    />
  )
}
