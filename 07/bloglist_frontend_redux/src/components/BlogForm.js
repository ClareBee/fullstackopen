import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  form: {
    width: '50%'
  },
  input: {
    width: '100%'
  },
  button: {
    float: 'right',
    marginTop: theme.spacing(2)
  }
}))

const BlogForm = (props) => {
  const classes = useStyles()
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
    <Paper className={classes.paper}>
      <form onSubmit={(e) => handleAddingBlog(e)} className={classes.form}>
        <h2>New Blog</h2>
        <div>
          <TextField
            label="Title"
            className={classes.input}
            InputProps={{ ...title.inputValues() }}
          />
        </div>
        <div>
          <TextField
            label="Author"
            className={classes.input}
            InputProps={{ ...author.inputValues() }}
          />
        </div>
        <div>
          <TextField
            label="URL"
            className={classes.input}
            InputProps={{ ...url.inputValues() }}
          />
        </div>
        <Button className={classes.button} variant="outlined" type="submit">Create</Button>
      </form>
    </Paper>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, { createBlog, setNotification })(BlogForm)
