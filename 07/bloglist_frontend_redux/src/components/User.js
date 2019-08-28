import React from 'react'

const User = (props) => {
  if ( props.user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>

      <h3>added blogs</h3>
      // ...
    </div>
  )
}

export default User
