import { useNavigate } from 'react-router-dom'
// @mui
import { Box, Container, List } from '@mui/material'
// routes
import { PATH_SECURITY, PATH_SETTING } from '../../routes/paths'
// components
import { Cover } from '../../components/Defaults/Cover'
import { StyledCardContainer } from '../../theme/styles/default-styles'
import { StyledSettingsCardContainer } from '../../theme/styles/machine-styles'
import ListItemsHeader from '../../components/ListTableTools/ListItemsHeader'
import ListItem from '../../components/ListTableTools/ListItem'
// constants
import { FORMLABELS } from '../../constants/default-constants'
import { ICONS } from '../../constants/icons/default-icons'
import { useAuthContext } from '../../auth/useAuthContext'

// ----------------------------------------------------------------------

function Setting() {
  const { isSettingAccessAllowed } = useAuthContext()

  const navigate = useNavigate()

  const linkDocumentType = () => {
    navigate(PATH_SETTING.documentType.list)
  }
  const linkDocumentCategory = () => {
    navigate(PATH_SETTING.documentCategory.list)
  }
  const linkRole = () => {
    navigate(PATH_SETTING.role.list)
  }
  const linkSignInLogs = () => {
    navigate(PATH_SETTING.signInLogs.list)
  }
  const linkRegions = () => {
    navigate(PATH_SETTING.regions.list)
  }

  const linkConfigs = () => {
    navigate(PATH_SETTING.configs.list)
  }

  const linkUserInvites = () => {
    navigate(PATH_SETTING.invite.list)
  }

  const linkBlockedCustomer = () => {
    navigate(PATH_SECURITY.config.blockedCustomer.list)
  }

  const linkBlockedUser = () => {
    navigate(PATH_SECURITY.config.blockedUser.list)
  }

  const linkBlackListIP = () => {
    navigate(PATH_SECURITY.config.blacklistIP.list)
  }

  const linkWhiteListIP = () => {
    navigate(PATH_SECURITY.config.whitelistIP.list)
  }

  return (
    <Container maxWidth={false}>
      <StyledCardContainer>
        <Cover name={FORMLABELS.COVER.SETTINGS} icon="mdi:cogs" />
      </StyledCardContainer>

      <Box
        rowGap={1}
        columnGap={4}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)', // First one spans 1 column, and the second spans 5 columns on sm screens
          lg: 'repeat(3, 1fr)',
        }}
      >
        {isSettingAccessAllowed && (
          <StyledSettingsCardContainer>
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={<ListItemsHeader header={FORMLABELS.SECURITY_SETTINGS} />}
            >
              <ListItem
                onClick={linkRole}
                icon={ICONS.SECURITY_ROLES.icon}
                content={ICONS.SECURITY_ROLES.heading}
              />
              <ListItem
                onClick={linkBlockedCustomer}
                icon={ICONS.BLOCKED_CUSTOMER.icon}
                content={ICONS.BLOCKED_CUSTOMER.heading}
              />

              <ListItem
                onClick={linkBlockedUser}
                icon={ICONS.BLOCKED_USER.icon}
                content={ICONS.BLOCKED_USER.heading}
              />

              <ListItem
                onClick={linkBlackListIP}
                icon={ICONS.BLACKLIST_IP.icon}
                content={ICONS.BLACKLIST_IP.heading}
              />

              <ListItem
                onClick={linkWhiteListIP}
                icon={ICONS.WHITELIST_IP.icon}
                content={ICONS.WHITELIST_IP.heading}
              />
            </List>

            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={<ListItemsHeader header={FORMLABELS.REPORTS} />}
            >
              <ListItem
                onClick={linkSignInLogs}
                icon={ICONS.SIGNIN_LOGS.icon}
                content={ICONS.SIGNIN_LOGS.heading}
              />
              <ListItem
                onClick={linkUserInvites}
                icon={ICONS.USER_INVITE.icon}
                content={ICONS.USER_INVITE.heading}
              />
            </List>
          </StyledSettingsCardContainer>
        )}
        <StyledSettingsCardContainer>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={<ListItemsHeader header={FORMLABELS.CONFIG} />}
          >
            <ListItem
              onClick={linkRegions}
              icon={ICONS.REGION.icon}
              content={ICONS.REGION.heading}
            />

            {isSettingAccessAllowed && (
              <ListItem
                onClick={linkConfigs}
                icon={ICONS.SYSTEM_CONFIG.icon}
                content={ICONS.SYSTEM_CONFIG.heading}
              />
            )}
            <ListItem
              onClick={() => navigate(PATH_SETTING.departments.list)}
              icon={ICONS.DEPARTMENNTS.icon}
              content={ICONS.DEPARTMENNTS.heading}
            />
          </List>
        </StyledSettingsCardContainer>

        <StyledSettingsCardContainer>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={<ListItemsHeader header={FORMLABELS.DOCUMENT_SETTINGS} />}
          >
            <ListItem
              onClick={linkDocumentCategory}
              icon={ICONS.DOCUMENT_CATEGORY.icon}
              content={ICONS.DOCUMENT_CATEGORY.heading}
            />
            <ListItem
              onClick={linkDocumentType}
              icon={ICONS.DOCUMENT_TYPE.icon}
              content={ICONS.DOCUMENT_TYPE.heading}
            />
          </List>
        </StyledSettingsCardContainer>
      </Box>
    </Container>
  )
}

export default Setting
