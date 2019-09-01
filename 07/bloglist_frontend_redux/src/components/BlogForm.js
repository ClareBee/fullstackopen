import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const BlogForm = (props) => {
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
    try {
      props.createBlog(newBlog)
    } catch(exception) {
      props.setNotification(`${exception}`, 'error')
    }
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form onSubmit={(e) => handleAddingBlog(e)}>
      <h2>New Blog</h2>
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
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, { createBlog, setNotification })(BlogForm)
