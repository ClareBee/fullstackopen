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
    <div style={blogStyle} className="blog">
      <div className="click-target" onClick={() => toggleVisibility()}>
        <h3 className="heading">
          <span>{blog.title} - {blog.author}</span> <span>{blog.likes} likes</span>
        </h3>
        <br />
        <div className="more-details" style={showWhenVisible}>
          URL: {blog.url}
          <hr />
          <div className="user">
            <div>
              <span className="likes">{blog.likes} likes</span>
              <button className="add-like"
                onClick={() => addLike(blog)}
              >Add Like 🖤</button>
            </div>
            <div>
              {ownerLoggedIn &&
                <button
                  className="cancel delete-blog"
                  onClick={() => deleteBlog(blog)}>
                  Delete
                </button>
              }
              <p>Added by {user}</p>
            </div>
          </div>
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
