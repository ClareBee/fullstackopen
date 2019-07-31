import React, { useState } from 'react'

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
    const {name, value} = e.target
    setNewBlog({...newBlog, [name]: value})
  }
  return (
    <form onSubmit={(e) => addBlog(e, newBlog)}>
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

export default BlogForm
