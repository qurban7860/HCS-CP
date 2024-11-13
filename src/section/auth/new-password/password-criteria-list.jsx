import React from 'react'
import PropTypes from 'prop-types'
import { Icon, ICON_NAME } from 'hook'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { StyledCriteriaListItemText } from '../style'

const PasswordCriteriaList = ({ password = '', confirmPassword = '' }) => {
 const criteria = [
  {
   id: 1,
   label: 'Minimum 8 characters',
   test: pwd => pwd.length >= 8
  },
  {
   id: 2,
   label: 'Contains at least one number',
   test: pwd => /\d/.test(pwd)
  },
  {
   id: 3,
   label: 'Contains at least one special character',
   test: pwd => /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
  },
  {
   id: 4,
   label: 'Contains at least one uppercase letter',
   test: pwd => /[A-Z]/.test(pwd)
  },
  {
   id: 5,
   label: 'Confirm password',
   test: pwd => pwd === confirmPassword
  }
 ]

 return (
  <List dense>
   {criteria.map(({ id, label, test }) => (
    <ListItem key={id} sx={{ py: 0.5 }}>
     <ListItemIcon sx={{ minWidth: 40 }}>
      {test(password) ? (
       <Icon icon={ICON_NAME.CHECK_CICLE_OUTLINE} color={theme => theme.palette.burnIn.altDark} sx={{ fontSize: 20 }} />
      ) : (
       <Icon icon={ICON_NAME.CLOSE_CIRCLE_OUTLINE} color={theme => theme.palette.error.main} sx={{ fontSize: 20 }} />
      )}
     </ListItemIcon>
     <StyledCriteriaListItemText primary={label} />
    </ListItem>
   ))}
  </List>
 )
}

PasswordCriteriaList.propTypes = {
 password: PropTypes.string,
 confirmPassword: PropTypes.string
}

export default PasswordCriteriaList
