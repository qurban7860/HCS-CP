import React from 'react'
import { useSettingContext } from 'hook'
import { Typography } from '@mui/material'
import { GStyledSpanBox } from 'theme/style'
import { TITLE, KEY } from 'constant'

const TableTitleBox = ({ user, title }) => {
  const { themeMode } = useSettingContext()
  return (
    <GStyledSpanBox>
      <Typography variant="h3" color={themeMode === KEY.LIGHT ? 'common.black' : 'common.white'}>
        {user?.customer?.name.toUpperCase() || TITLE.ORGANIZATION.toUpperCase()} &nbsp;
      </Typography>
      <Typography variant="h3" color={themeMode === KEY.LIGHT ? 'grey.200' : 'howick.bronze'}>
        / {title}
      </Typography>
    </GStyledSpanBox>
  )
}

export default TableTitleBox
