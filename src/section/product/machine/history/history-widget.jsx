import PropTypes from 'prop-types'
import { Grid } from '@mui/material'
import { FormHeader } from 'component'
import Timeline from '@mui/lab/Timeline'
import { LABEL } from 'constant'
import { HistoryTimelineItem } from '.'
import { ICON_NAME } from 'hook'

const { NOT_SPECIFIED, PURCHASED, MANUFACTURED, SHIPPED, INSTALLED, TRANSFERRED } = LABEL

const MachineHistoryWidget = ({ value }) => {
  return (
    <Grid
      container
      mb={2}
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}>
      <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
        <FormHeader label={LABEL.MACHINE_HISTORY} />
        <Grid container>
          <Timeline position="right">
            <HistoryTimelineItem date={value?.purchasedDate ? value?.purchasedDate : NOT_SPECIFIED} icon={ICON_NAME.PURCHASED} story={PURCHASED} />
            <HistoryTimelineItem
              date={value?.manufactureDate ? value?.manufactureDate : NOT_SPECIFIED}
              icon={ICON_NAME.MANUFACTURE}
              story={MANUFACTURED}
            />
            <HistoryTimelineItem date={value?.shippingDate ? value?.shippingDate : NOT_SPECIFIED} icon={ICON_NAME.SHIPPING} story={SHIPPED} />
            <HistoryTimelineItem
              date={value?.installationDate ? value?.installationDate : NOT_SPECIFIED}
              icon={ICON_NAME.INSTALL}
              story={INSTALLED}
            />
            {value?.transferredDate ? (
              <HistoryTimelineItem
                date={value?.transferredDate ? value?.transferredDate : NOT_SPECIFIED}
                icon={ICON_NAME.TRANSFER}
                story={TRANSFERRED}
                transferredTo={value?.transferredCustomer}
              />
            ) : value?.transferredHistory && value?.transferredHistory.length > 0 ? (
              value?.transferredHistory.map((transfer, index) => (
                <HistoryTimelineItem
                  key={index}
                  date={NOT_SPECIFIED}
                  icon={ICON_NAME.TRANSFER}
                  story={TRANSFERRED}
                  transferredTo={transfer?.customer?.name}
                />
              ))
            ) : null}
            <HistoryTimelineItem
              // TODO: this will be date of the latest status
              date={NOT_SPECIFIED}
              icon={ICON_NAME.STATUS}
              color="howick.orange"
              status={value?.status}
            />
          </Timeline>
        </Grid>
      </Grid>
    </Grid>
  )
}

MachineHistoryWidget.propTypes = {
  value: PropTypes.object
}

export default MachineHistoryWidget
