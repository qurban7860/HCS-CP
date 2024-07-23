import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useSettingContext, Icon, ICON_NAME } from 'hook'
import { alpha, useTheme } from '@mui/material/styles'
import { Box, Stack, Card, Divider, Typography, CardHeader } from '@mui/material'
import { GStyledTopBorderDivider, GStyledSpanBox, GStyledTableChip } from 'theme/style'
import { Iconify } from 'component/iconify'
import { IconTooltip } from 'component'
import { CustomAvatar, Avatar } from 'component/avatar'
import { KEY, TYPOGRAPHY } from 'constant'

DashboardWidget.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string
}

function DashboardWidget({ title, subheader, list, machines = [1, 2], supportTickets }) {
  const theme = useTheme()
  const { themeMode } = useSettingContext()
  const { spContacts } = useSelector((state) => state.contact)
  return (
    <Card
      sx={{
        position: 'absolute',
        bottom: 130,
        left: 100,
        width: '600px',
        height: '400px',
        backgroundColor: 'transparent'
      }}>
      <GStyledTopBorderDivider mode={themeMode} />
      <Stack spacing={2} sx={{ p: 2 }}>
        <CardHeader title={title} subheader={subheader} />
        <GStyledSpanBox>
          <IconTooltip
            title={'machines'}
            icon={ICON_NAME.FRAMA}
            color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
            iconOnly
          />
          <Typography variant={TYPOGRAPHY.H4} color="initial">
            Machines: &nbsp;
          </Typography>
          <GStyledTableChip
            mode={themeMode}
            label={
              <Typography variant={TYPOGRAPHY.H4} color={theme.palette.common.black}>
                {machines?.length}
              </Typography>
            }
          />
        </GStyledSpanBox>

        <GStyledSpanBox>
          <IconTooltip
            title={'support tickets'}
            icon={ICON_NAME.TICKET}
            color={themeMode === KEY.LIGHT ? theme.palette.grey[500] : theme.palette.grey[500]}
            iconOnly
          />
          <Typography variant={TYPOGRAPHY.H4} color="initial">
            Support Tickets: &nbsp;
          </Typography>
          <GStyledTableChip
            mode={themeMode}
            label={
              <Typography variant={TYPOGRAPHY.H4} color={theme.palette.common.black}>
                {supportTickets?.length}
              </Typography>
            }
          />
        </GStyledSpanBox>
      </Stack>
    </Card>
  )
}

// ----------------------------------------------------------------------

OperatorItem.propTypes = {
  operator: PropTypes.shape({
    _id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    produced: PropTypes.number
  }),
  index: PropTypes.number
}

function OperatorItem({ operator, index }) {
  const fullName = `${operator?.firstName || ''} ${operator?.lastName || ''}`

  return (
    <Stack key={operator._id} direction="row" alignItems="center" spacing={1} sx={{ padding: '10px 0px', borderTop: '1px solid #e9e9e9' }}>
      <CustomAvatar name={fullName} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{fullName}</Typography>
        <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
          <Iconify icon="mdi:account-arrow-up" width={16} color="green" />
          {operator.produced}
        </Typography>
      </Box>

      <Avatar
        sx={{
          p: 1,
          width: 40,
          height: 40,
          borderRadius: '50%',
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08)
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
          })
        }}
      />
    </Stack>
  )
}

export default DashboardWidget
