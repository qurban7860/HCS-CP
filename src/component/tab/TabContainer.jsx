import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Typography, tabsClasses } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom'
import { GStyledSpanBox, GStyledTabBox, GStyledTab } from 'theme/style'
import { Icon } from 'hook'

export default function TabContainer({ tabs, orientation = 'horizontal', isNotAbsolute = false, ...other }) {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const currentTab = useMemo(() => {
        return tabs?.find(tab => location.pathname.startsWith(tab?.path))?.id ?? tabs[0]?.id
    }, [location.pathname, tabs])

    const handleChange = (event, newValue) => {
        const selectedTab = tabs.find(tab => tab.id === newValue)
        if (selectedTab) navigate(selectedTab.path)
    }

    const options = {
        value: currentTab,
        onChange: handleChange,
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
        <GStyledSpanBox gap={2}>
            <GStyledTabBox>
                <Tabs variant="scrollable" {...options}>
                    {tabs?.map(tab => (
                        <GStyledTab
                            key={tab.id}
                            value={tab.id}
                            disabled={tab.disabled}
                            label={<Typography variant="overline1">{tab.label}</Typography>}
                            icon={tab?.icon && <Icon icon={tab.icon} />}
                            {...tab.a11yProps}
                        />
                    ))}
                </Tabs>
            </GStyledTabBox>
        </GStyledSpanBox>
    )
}

TabContainer.propTypes = {
    isNotAbsolute: PropTypes.bool,
    orientation: PropTypes.string,
    tabs: PropTypes.array.isRequired
}
