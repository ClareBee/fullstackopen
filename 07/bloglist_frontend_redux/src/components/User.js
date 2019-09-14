import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user, blogs }) => {
  if ( user === undefined) {
    return null
  }

  const userBlogs = blogs.filter(blog => blog === user.id)
  console.log(blogs)

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>
      <ul>
        { blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object
}

export default User
