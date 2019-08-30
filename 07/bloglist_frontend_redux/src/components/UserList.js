import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import User from './User'

const UserList = ({ users, currentUser }) => {
  console.log('list', users)
  return (
    users && users.map(user =>
      <User
        key={user.id}
        name={user.name}
        currentUser={currentUser}
      />)
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  //  check naming
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, null)(UserList)
