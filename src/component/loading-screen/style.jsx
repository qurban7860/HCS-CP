import { m } from 'framer-motion'
import { styled, keyframes } from '@mui/material/styles'
import { Box } from '@mui/material'
import { KEY } from 'constant'

export const StyledRootDiv = styled(m.div)(({ theme }) => ({
 height: '100vh',
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: theme.palette.background.default
}))

const grow = keyframes`
  0% { width: 0; }
  50% { width: 100%; }
  100% { width: 0; }
`

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
`

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
`

const rotateDiagonal = keyframes`
  0% {
    opacity: 0;
    transform: rotate(45deg) scaleY(0);
  }
  100% {
    opacity: 1;
    transform: rotate(45deg) scaleY(1);
  }
`

const rotateDiagonalReverse = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-45deg) scaleY(0);
  }
  100% {
    opacity: 1;
    transform: rotate(-45deg) scaleY(1);
  }
`

export const StyledAnimatedPath = styled('path')(({ theme, mode, strokeColor }) => ({
 fill: 'none',
 stroke: !strokeColor && (mode === KEY.LIGHT ? theme.palette.grey[400] : theme.palette.grey[500]),
 strokeWidth: 1.5,
 strokeMiterlimit: 100,
 strokeDasharray: 1000,
 strokeDashoffset: 1000,
 animation: 'flow 3s linear infinite',
 '@keyframes flow': {
  from: {
   strokeDashoffset: 1000
  },
  to: {
   strokeDashoffset: 0
  }
 }
}))

export const LoaderContainer = styled(Box)(({ theme }) => ({
 width: '100%',
 maxWidth: '350px',
 margin: '0 auto',
 padding: theme.spacing(2),
 position: 'relative',
 height: '128px'
}))

export const MainBeam = styled(Box)(({ theme, bottom }) => ({
 position: 'absolute',
 top: bottom ? 'auto' : '32px',
 bottom: bottom ? '32px' : 'auto',
 left: 0,
 width: '100%',
 height: '4px',
 backgroundColor: theme.palette.grey[200],
 transform: bottom ? 'scaleX(-1)' : 'none'
}))

export const AnimatedFill = styled(Box)(({ theme }) => ({
 position: 'absolute',
 top: 0,
 left: 0,
 height: '100%',
 backgroundColor: theme.palette.grey[300],
 animation: `${grow} 2s ease-in-out infinite`,
 width: '100%'
}))

export const BeamsContainer = styled(Box)(({ bottom }) => ({
 position: 'absolute',
 top: bottom ? 'auto' : '32px',
 bottom: bottom ? '32px' : 'auto',
 left: 0,
 width: '100%',
 margin: '0 auto',
 transform: bottom ? 'scaleX(-1)' : 'none'
}))

export const VerticalBeam = styled(Box)(({ theme, index, bottom }) => ({
 position: 'absolute',
 top: bottom ? 'auto' : 0,
 bottom: bottom ? 0 : 'auto',
 height: '16px',
 width: '4px',
 backgroundColor: theme.palette.grey[200],
 left: `${(index + 1) * 12.5}%`,
 transformOrigin: bottom ? 'bottom' : 'top',
 animation: `${bottom ? slideUp : slideDown} 0.5s ease-out ${index * 0.1}s`,
 animationFillMode: 'forwards',
 opacity: 0,
 transform: 'scaleY(0)'
}))

export const DiagonalBeam = styled(Box)(({ theme, index, bottom }) => ({
 position: 'absolute',
 top: bottom ? 'auto' : 0,
 bottom: bottom ? 0 : 'auto',
 height: '24px',
 width: '4px',
 backgroundColor: theme.palette.grey[200],
 left: `${(index + 1) * 12.5}%`,
 transformOrigin: bottom ? 'bottom left' : 'top left',
 animation: `${bottom ? rotateDiagonalReverse : rotateDiagonal} 0.5s ease-out ${0.8 + index * 0.1}s`,
 animationFillMode: 'forwards',
 opacity: 0,
 transform: bottom ? 'rotate(-45deg) scaleY(0)' : 'rotate(45deg) scaleY(0)'
}))
