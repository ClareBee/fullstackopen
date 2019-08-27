import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = (props) => {
  return (
    props.blogs.map(blog =>
      <Blog
        key={blog.title}
        blog={blog}
        currentUser={props.currentUser}
      />)
  )
}

const orderByLikes = blogs => {
  console.log('blogs', blogs)
  return blogs.sort((a,b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogs: orderByLikes(state.blogs),
    user: state.user
  }
}

export default connect(mapStateToProps, null)(BlogList)
