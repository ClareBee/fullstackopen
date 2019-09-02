import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentOnBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const CommentForm = (props) => {
  const comment = useField('text')

  const handleAddingComment = (e) => {
    e.preventDefault()
    const blogComment = {
      comment: comment.value
    }
    try {
      props.commentOnBlog(props.blog, blogComment)
    } catch(exception) {
      props.setNotification(`${exception}`, 'error')
    }
    comment.reset()
  }

  return (
    <form onSubmit={(e) => handleAddingComment(e)}>
      <h2>New Comment</h2>
      <div>
        <TextField label="Comment"
          InputProps={{ ...comment.inputValues() }}
        />
      </div>
      <Button type="submit" variant="outlined">Create</Button>
    </form>
  )
}

CommentForm.propTypes = {
  commentOnBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, { commentOnBlog, setNotification })(CommentForm)
