import PropTypes from 'prop-types'
import { useSettingContext, ICON_NAME } from 'hook'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { GStyledHeaderCardContainer, GStyledTopBorderDivider, GStyledSpanBox } from 'theme/style'
import { SvgFlagIcon, IconTooltip, ViewFormField, BadgeCardMedia } from 'component'
import { CustomerTabsContainer } from 'section/crm/customer'
import { KEY, VARIANT, LABEL, FLEX, FLEX_DIR, VIEW_FORM } from 'constant'
import { truncate } from 'util'

const CustomerNav = ({ renderedTab, navigatePage, value, isLoading }) => {
  const theme = useTheme()
  const { themeMode } = useSettingContext()

  return (
    <GStyledHeaderCardContainer>
      <GStyledTopBorderDivider mode={themeMode} />
      <Grid container px={1.5}>
        <Grid item lg={8}>
          <GStyledSpanBox my={2}>
            <BadgeCardMedia />
            <ViewFormField variant={VARIANT.TYPOGRAPHY.H4} heading={VIEW_FORM.ORGANIZATION} isLoading={isLoading} isMachineView>
              {truncate(value?.name, 50)}
            </ViewFormField>
          </GStyledSpanBox>
        </Grid>
        <Grid item lg={4}>
          <Grid container justifyContent={FLEX.FLEX_END} flexDirection={FLEX_DIR.COLUMN} alignContent={FLEX.FLEX_END}>
            <Grid item xs={12} justifyContent={FLEX.FLEX_END} mt={2}>
              <Grid container justifyContent={FLEX.FLEX_END} gap={2} alignItems={KEY.CENTER}>
                <SvgFlagIcon
                  country={value?.country}
                  color={themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.bronze}
                  dimension={24}
                />
                {value?.isActive ? (
                  <IconTooltip
                    title={LABEL.ACTIVE}
                    icon={ICON_NAME.ACTIVE}
                    color={themeMode === KEY.LIGHT ? theme.palette.burnIn.altDark : theme.palette.burnIn.main}
                    isActiveIcon
                    iconOnly
                  />
                ) : (
                  <IconTooltip title={LABEL.INACTIVE} icon={ICON_NAME.INACTIVE} color={theme.palette.error.dark} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} px={2}>
        <CustomerTabsContainer value={value} renderedTab={renderedTab} navigatePage={navigatePage} />
      </Grid>
    </GStyledHeaderCardContainer>
  )
}

CustomerNav.propTypes = {
  current: PropTypes.number,
  value: PropTypes.any,
  isLoading: PropTypes.bool
}

export default CustomerNav
