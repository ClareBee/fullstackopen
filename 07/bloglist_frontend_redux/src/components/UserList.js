import React from 'react'
import { connect } from 'react-redux'
import User from './User'

const UserList = (props) => {
  console.log('list', props.users)
  return (
    props.users && props.users.map(user =>
      <User
        key={user.id}
        name={user.name}
        currentUser={props.currentUser}
      />)
  )
}

const mapStateToProps = (state) => {
  console.log('liststate', state)
  return {
    users: state.user.users,
    user: state.user.currentUser
  }
}

export default connect(mapStateToProps, null)(UserList)
