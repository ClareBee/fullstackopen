import React from 'react'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleAddingBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    addBlog(newBlog)
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form onSubmit={(e) => handleAddingBlog(e)}>
      <div>
        <label>Title</label>
        <input
          {...title.inputValues()}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          {...author.inputValues()}
        />
      </div>
      <div>
        <label>URL</label>
        <input
          {...url.inputValues()}
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
