import React from 'react'
import { Box, Typography, Avatar, List, ListItem, ListItemText, Grid, Divider, Chip, Card } from '@mui/material'
import { GStyledContainer } from 'theme/style'
import { MotionLazyContainer } from 'component/animate'
import { useSettingContext } from 'component/setting'
import { MARGIN } from 'config'

const ProfileLayout = () => {
  const { themeMode } = useSettingContext()

  const machineList = [
    { id: 20566, name: 'FRAMA3200', status: 'Running' },
    { id: 20567, name: 'Decoiler', status: 'Running' },
    { id: 15699, name: 'H100', status: 'Stopped' },
  ]

  const ticketList = [{ id: 'HWKSC-12345', status: 'Under Review', agent: 'Maria Clara' }]

  return (
    <MotionLazyContainer display="flex">
      <Grid container spacing={2} flexDirection="row" {...MARGIN.PAGE_PROP}>
        <Grid item lg={3}>
          <Grid container mb={2}>
            <Grid item lg={12} sm={12} mb={2} bgcolor="background.paper">
              <Box bgcolor="success.main" flex={1} px={2} pt={2}>
                <Typography variant="h6" color="common.white" gutterBottom>
                  Your Machine/s
                </Typography>
              </Box>
              <List>
                {machineList.map((machine) => (
                  <ListItem key={machine.id}>
                    <Grid container alignItems="center">
                      <Grid item xs={8}>
                        <ListItemText primary={machine.id} secondary={machine.name} />
                      </Grid>
                      <Grid item xs={4} flex={1} justifyContent="flex-end">
                        <ListItemText>
                          <Chip
                            label={<Typography variant="h6">{machine.status}</Typography>}
                            size="small"
                            variant="outlined"
                            sx={{
                              backgroundColor: machine.status === 'Stopped' ? 'error.main' : 'burnIn.main',
                              color: `common.${machine.status === 'Stopped' ? 'white' : 'black'}`,
                              fontWeight: 'bold',
                            }}
                          />
                        </ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item lg={12} sm={12} bgcolor="background.paper">
              <Box bgcolor="success.main" flex={1} px={2} pt={2}>
                <Typography variant="h6" color="common.white" gutterBottom>
                  Your Ticket/s
                </Typography>
              </Box>
              <List>
                {ticketList.map((ticket) => (
                  <ListItem key={ticket.id}>
                    <ListItemText primary={ticket.id} secondary={`STATUS: ${ticket.status} | AGENT: ${ticket.agent}`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sm={12}
          lg={9}
          sx={{
            height: '100vh',
          }}
        >
          <Card height="100vh" py={2}>
            <Divider
              sx={{
                height: 2,
                borderStyle: 'solid',
                borderColor: themeMode === 'light' ? 'success.main' : 'grey.400',
                borderWidth: 10,
              }}
            />
            <Box m={4}>
              <Typography variant="subtitle1">John Doe</Typography>
              <Typography variant="body2">johndoe@steelcompany.com</Typography>
              <Typography variant="body2">123 Test Blvd., Testing City, TS</Typography>
              <Typography variant="body2">+1 234 123 45 67</Typography>
              <Typography variant="body2">Role: Customer</Typography>
            </Box>
            <Avatar>Avatar</Avatar>
          </Card>
        </Grid>
      </Grid>
    </MotionLazyContainer>
  )
}

export default ProfileLayout
