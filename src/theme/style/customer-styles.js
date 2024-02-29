import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { CardMedia, Card, Grid } from '@mui/material'
import CustomAvatar from '../../../../../hp_dev-new/src/components/custom-avatar/CustomAvatar'
import Scrollbar from '../../../../../hp_dev-new/src/components/scrollbar/Scrollbar'

/**
 * @customer :contacts ____________________________________________________________________________________________
 */

export const CardBase = styled(Card)(({ theme }) => ({
  display: 'block',
  animation: 'fadeIn ease 0.8s',
  animationFillMode: 'forwards',
  position: 'relative',
  padding: '10px',
}))

export const CustomAvatarBase = styled(CustomAvatar)(({ theme }) => ({
  width: '100px',
  height: '100px',
  display: 'flex',
  marginRight: 'auto',
  marginLeft: 'auto',
  marginBottom: '0px',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
  fontSize: '40px',
  zIndex: '2',
}))

export const CardMediaBase = styled(CardMedia)(({ theme }) => ({
  height: '250px',
  opacity: '0.5',
  display: 'flex',
  zIndex: '-1',
  position: 'absolute',
  top: '-5',
  left: '0',
  right: '0',
  bottom: '0',
  width: '100%',
  backgroundColor: 'secondary.main',
  objectFit: 'cover',
}))

export const GridBaseViewForm = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  animation: 'fadeIn ease 0.8s',
  animationFillMode: 'forwards',
  position: 'relative',
  zIndex: '1',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  borderRadius: '10px',
}))

export const GridBaseCard1 = styled(Grid)(({ theme }) => ({
  display: 'block',
  textAlign: 'center',
  width: '200px',
}))

export const GridBaseCard2 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  textAlign: 'left',
  width: '200px',
}))

/**
 * @functions ____________________________________________________________________________________________
 */

/**
 * @param {StyledCardWrapper} wrapper for the card
 * @returns wrapper for the card
 */
export function StyledCardWrapper({ children, isMobile, condition, ...props }) {
  return (
    <Card
      sx={{
        borderRadius: '5px',
        backgroundColor: condition && '#e9ecff',
        height: isMobile ? '140px' : '200px',
        width: '100%',
      }}
    >
      {children}
    </Card>
  )
}

StyledCardWrapper.propTypes = {
  children: PropTypes.node,
  isMobile: PropTypes.bool,
  condition: PropTypes.bool,
}

export function StyledScrollbar({ maxHeight, contacts, children, ...props }) {
  return (
    <Scrollbar
      sx={{
        height: {
          xs: '14vh',
          sm: '22vh',
          lg: 'fit-content',
        },
        maxHeight: maxHeight ? `${maxHeight}vh` : '82vh',
        scrollSnapType: 'y mandatory',
        scrollSnapAlign: 'start',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        '& .simplebar-content': {
          height: { xs: 'calc(100vh - 200px)', md: '100%' },
        },
        border: contacts <= 4 ? 'none' : '1px solid #D9D9D9',
        backgroundColor: '#e9e9e9',
        borderRadius: '10px',
        padding: '5px',
      }}
    >
      {children}
    </Scrollbar>
  )
}

StyledScrollbar.propTypes = {
  maxHeight: PropTypes.number,
  contacts: PropTypes.number,
  children: PropTypes.node,
}
// ______________________________________________________________________________________________________________________

/**
 * @customer :sites ____________________________________________________________________________________________
 */
