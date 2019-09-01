import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlog, destroyBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

const Blog = ({
  blog,
  currentUser,
  updateBlog,
  destroyBlog,
  setNotification
}) => {
  if (blog === undefined) {
    return null
  }
  console.log('blog', blog)
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

  const user = blog.user ? blog.user.username : 'Anon'
  const ownerLoggedIn = blog.user && (blog.user.name === currentUser.name)
  return (
    <div>
      <h3>
        <span>{blog.title} - {blog.author}</span> <span>{blog.likes} likes</span>
      </h3>
      <br />
      <div>
        URL: {blog.url}
        <hr />
        <div>
          <div>
            <span>{blog.likes} likes</span>
            <button
              onClick={() => addLike(blog)}
            >Add Like <span role="img" aria-label="heart">🖤</span></button>
          </div>
          <div>
            {ownerLoggedIn &&
              <button
                onClick={() => deleteBlog(blog)}>
                Delete
              </button>
            }
            <p>Added by {user}</p>
          </div>
        </div>
      </div>
      <div>
      Comments:
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}>{comment.comment}</li>)}
        </ul>
        <CommentForm blog={blog}/>
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
