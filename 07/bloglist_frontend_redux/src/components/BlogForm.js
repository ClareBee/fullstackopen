import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
        <TextField label="Title"
          InputProps={{ ...title.inputValues() }}
        />
      </div>
      <div>
        <TextField label="Author"
          InputProps={{ ...author.inputValues() }}
        />
      </div>
      <div>
        <TextField label="URL"
          InputProps={{ ...url.inputValues() }}
        />
      </div>
      <Button variant="outlined" type="submit">Create</Button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, { createBlog, setNotification })(BlogForm)
