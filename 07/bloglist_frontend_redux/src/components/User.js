import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  if ( user === undefined) {
    console.log('wtf')
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>
      <ul>
        { user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

User.propTypes = {
  // check syntax
  user: PropTypes.object.isRequired
}

export default User
