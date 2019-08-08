import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const user = blog.user ? blog.user.username : 'Anon'
  const ownerLoggedIn = blog.user && (blog.user.name === currentUser.name)
  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()}>
        {blog.title} {blog.author} - {blog.likes} likes
        <div style={showWhenVisible}>
          {blog.url}
          <hr />
          {blog.likes}
          <button
            onClick={() => addLike(blog)}
          >Likes</button>
          <br />
          Added by {user}
          {ownerLoggedIn &&
            <button
              onClick={() => deleteBlog(blog)}>
              Delete
            </button>
          }
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default Blog
