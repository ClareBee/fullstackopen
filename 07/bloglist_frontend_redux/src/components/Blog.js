import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlog, destroyBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({
  blog,
  currentUser,
  updateBlog,
  destroyBlog,
  setNotification
}) => {
  if ( blog === undefined) {
    return null
  }

  // check it's not shadowed
  const addLike = async (blog) => {
    try {
      updateBlog(blog)
      setNotification(`Blog ${blog.title} now has ${blog.likes + 1} likes!`, 'success')
    } catch(exception) {
      setNotification(`${exception}`, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const title = blog.title
      if(window.confirm(`Do you want to delete ${title}?`)){
        destroyBlog(blog)
        setNotification(`${title} deleted successfully!`, 'success')
      }
      return
    } catch(exception) {
      setNotification(`${exception}`, 'error')
    }
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
      <h3 className="heading">
        <span>{blog.title} - {blog.author}</span> <span>{blog.likes} likes</span>
      </h3>
      <br />
      <div className="more-details">
        URL: {blog.url}
        <hr />
        <div className="user">
          <div>
            <span className="likes">{blog.likes} likes</span>
            <button className="add-like"
              onClick={() => addLike(blog)}
            >Add Like <span role="img" aria-label="heart">🖤</span></button>
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
  )
}

Blog.propTypes = {
  setNotification: PropTypes.func.isRequired,
  destroyBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  blog: PropTypes.object
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = {
  setNotification,
  destroyBlog,
  updateBlog
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)
