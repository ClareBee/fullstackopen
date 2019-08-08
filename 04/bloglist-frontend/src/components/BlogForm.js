import React, { useState } from 'react'
import PropTypes from 'prop-types'

const initialBlog = {
  title: '',
  author: '',
  url: ''
}

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState(initialBlog)
  const { title, author, url } = newBlog

  const handleNewBlog = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleAddingBlog = (e) => {
    e.preventDefault()
    addBlog(newBlog)
    setNewBlog(initialBlog)
  }

  return (
    <form onSubmit={(e) => handleAddingBlog(e)}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleNewBlog}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          name="author"
          onChange={handleNewBlog}
        />
      </div>
      <div>
        <label>URL</label>
        <input
          type="text"
          value={url}
          name="url"
          onChange={handleNewBlog}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
