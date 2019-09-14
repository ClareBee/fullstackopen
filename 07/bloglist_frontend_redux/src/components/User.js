import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user, blogs }) => {
  if ( user === undefined) {
    return null
  }

  const userBlogs = blogs.filter(blog => blog.user && (blog.user.id === user.id))

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>
      <ul>
        { userBlogs && userBlogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array
}

export default User
