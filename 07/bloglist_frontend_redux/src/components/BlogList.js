import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = (props) => {
  return (
    <React.Fragment>
      <Notification />
      <Toggleable buttonLabel="New Blog" className="success">
        <BlogForm />
      </Toggleable>
      <h2>Blogs</h2>
      { props.blogs.map(blog =>
        <Blog
          key={blog.title}
          blog={blog}
          currentUser={props.currentUser}
        />)
      }
    </React.Fragment>
  )
}

const orderByLikes = blogs => {
  return blogs.sort((a,b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogs: orderByLikes(state.blogs),
    user: state.user
  }
}

export default connect(mapStateToProps, null)(BlogList)
