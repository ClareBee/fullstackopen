import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const UserList = ({ users }) => {
  if ( users === undefined) {
    return null
  }
  return (
    users.map(user =>
      <li key={user.id}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </li>)
  )
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
