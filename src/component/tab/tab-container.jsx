import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GTabContainerOption } from 'theme/style'
import { VARIANT } from 'constant'

function TabContainer({ tabsClasses, currentTab = 0, setCurrentTab = () => {}, children, ...other }) {
  const theme = useTheme()
  const options = {
    onChange: (event, newValue) => {
      setCurrentTab(newValue)
    },
    value: currentTab,
    sx: {
      [`& .${tabsClasses?.scrollButtons}`]: {
        '&.Mui-disabled': { opacity: 0.3 }
      },
      width: 1,
      bottom: 0,
      zIndex: 9,
      display: 'flex',
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      '& .MuiTabs-scrollButtons': {
        width: 20,
        '&:hover': {
          backgroundColor: theme.palette.howick.darkBlue
        }
      },
      '& .MuiButtonBase-root': {
        marginRight: '0px !important'
      },
      '& .MuiIconButton-root': {
        mr: '5px  !important'
      },
      '& .Mui-selected': {
        pr: 1
      }
    },
    ...other
  }

  return (
    <Tabs variant={VARIANT.SCROLLABLE} {...options}>
      {children}
    </Tabs>
  )
}

export default TabContainer
