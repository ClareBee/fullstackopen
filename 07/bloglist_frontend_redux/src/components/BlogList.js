import React from 'react'
import { connect } from 'react-redux'
import { destroyBlog } from '../reducers/blogReducer'

import Blog from './Blog'

const BlogList = (props) => {
  console.log('bloglist', props)
  const orderByLikes = blogs => (
    blogs.sort((a,b) => b.likes - a.likes)
  )

  return (
    orderByLikes(props.blogs).map(blog =>
      <Blog
        key={blog.title}
        blog={blog}
        deleteBlog={props.destroyBlog}
        currentUser={props.currentUser}
      />)
  )
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  destroyBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
