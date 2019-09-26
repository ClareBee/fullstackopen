import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentOnBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useField } from '../../hooks'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

const CommentForm = (props) => {
  const comment = useField('text')

  const handleAddingComment = (e) => {
    e.preventDefault()
    if(comment.value === ''){
      return null
    }
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
    <Box m={2} p={1}>
      <form onSubmit={(e) => handleAddingComment(e)}>
        <h2>New Comment</h2>
        <Box m={2}>
          <TextField
            id="comment"
            label="Comment"
            fullWidth
            InputProps={{ ...comment.inputValues() }}
          />
        </Box>
        <Box m={2}>
          <Button
            data-cy="add-comment"
            color="secondary"
            type="submit"
            variant="contained"
          >Add</Button>
        </Box>
      </form>
    </Box>
  )
}

CommentForm.propTypes = {
  commentOnBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, { commentOnBlog, setNotification })(CommentForm)
