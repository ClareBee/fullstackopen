import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import Notification from './Notification'

const BlogList = (props) => {
  return (
    <React.Fragment>
      <Notification />
      <BlogForm />
      <h2>Blogs</h2>
      <ul>
        {  props.blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>)
        }
      </ul>
    </React.Fragment>
  )
}

const orderByLikes = blogs => {
  return blogs.sort((a,b) => b.likes - a.likes)
}

BlogForm.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    blogs: orderByLikes(state.blogs),
    user: state.user,
    // check this works and make naming consistent
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(BlogList)
