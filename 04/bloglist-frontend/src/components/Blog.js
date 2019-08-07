import React, { useState } from 'react'
const Blog = ({ blog, addLike }) => {
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
        </div>
      </div>
    </div>
  )
}

export default Blog
