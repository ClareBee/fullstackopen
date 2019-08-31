import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import User from './User'

const UserList = ({ users, currentUser }) => {
  if ( users === undefined) {
    return null
  }
  return (
    users.map(user =>
      <User
        key={user.id}
        user={user}
        currentUser={currentUser}
      />)
  )
}

UserList.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, null)(UserList)
