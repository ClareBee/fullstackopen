import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import PropTypes from 'prop-types'

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
      // props.setNotification(`${newBlog.title} added successfully!`, 'success')
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
      <button className="success" type="submit">Create</button>
    </form>
  )
}

// BlogForm.propTypes = {
//   addBlog: PropTypes.func.isRequired
// }

export default connect(null, { createBlog, setNotification })(BlogForm)
