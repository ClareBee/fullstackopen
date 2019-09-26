import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

const UserList = ({ users }) => {
  if ( users === undefined) {
    return null
  }
  return (
    <Paper>
      <List>
        {  users.map(user =>
          <React.Fragment key={user.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Icon>face</Icon>
              </ListItemAvatar>
              <Link to={`/users/${user.id}`}>
                <ListItemText
                  primary={user.name}
                />
              </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        )}
      </List>
    </Paper>)
}

UserList.propTypes = {
  users: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
  }
}

export default connect(mapStateToProps, null)(UserList)
