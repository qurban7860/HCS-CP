import PropTypes from 'prop-types'
import { Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { VARIANT } from 'constant'

function TabContainer({ tabsClasses, currentTab = 0, setCurrentTab = () => {}, children, isNotAbsolute = false, orientation = 'horizontal', ...other }) {
 const theme = useTheme()
 const options = {
  onChange: (event, newValue) => {
   setCurrentTab(newValue)
  },
  value: currentTab,
  orientation,
  sx: {
   [`& .${tabsClasses?.scrollButtons}`]: {
    '&.Mui-disabled': { opacity: 0.3 }
   },
   width: 1,
   bottom: 0,
   zIndex: 9,
   display: 'flex',
   position: isNotAbsolute ? 'static' : 'absolute',
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

TabContainer.propTypes = {
 tabsClasses: PropTypes.object,
 isNotAbsolute: PropTypes.bool,
 currentTab: PropTypes.number,
 orientation: PropTypes.string,
 setCurrentTab: PropTypes.func,
 children: PropTypes.node
}

export default TabContainer
