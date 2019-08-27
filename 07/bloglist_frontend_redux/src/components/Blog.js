import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateBlog, destroyBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async (blog) => {
    try {
      props.updateBlog(blog)
      props.setNotification(`Blog ${blog.title} now has ${blog.likes + 1} likes!`, 'success')
    } catch(exception) {
      props.setNotification(`${exception}`, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const title = blog.title
      if(window.confirm(`Do you want to delete ${title}?`)){
        props.destroyBlog(blog)
        props.setNotification(`${title} deleted successfully!`, 'success')
      }
      return
    } catch(exception) {
      props.setNotification(`${exception}`, 'error')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(props.blog.user)
  const user = props.blog.user ? props.blog.user.username : 'Anon'
  const ownerLoggedIn = props.blog.user && (props.blog.user.name === props.currentUser.name)
  return (
    <div style={blogStyle} className="blog">
      <div className="click-target" onClick={() => toggleVisibility()}>
        <h3 className="heading">
          <span>{props.blog.title} - {props.blog.author}</span> <span>{props.blog.likes} likes</span>
        </h3>
        <br />
        <div className="more-details" style={showWhenVisible}>
          URL: {props.blog.url}
          <hr />
          <div className="user">
            <div>
              <span className="likes">{props.blog.likes} likes</span>
              <button className="add-like"
                onClick={() => addLike(props.blog)}
              >Add Like 🖤</button>
            </div>
            <div>
              {ownerLoggedIn &&
                <button
                  className="cancel delete-blog"
                  onClick={() => deleteBlog(props.blog)}>
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

const mapDispatchToProps = {
  setNotification,
  destroyBlog,
  updateBlog
}
export default connect(null, mapDispatchToProps)(Blog)
