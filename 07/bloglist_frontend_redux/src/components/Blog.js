import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { updateBlog, destroyBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const Blog = ({
  blog,
  currentUser,
  updateBlog,
  destroyBlog,
  setNotification
}) => {
  if (blog === undefined) {
    return null
  }
  console.log('blog', blog)
  // check it's not shadowed
  const addLike = async (blog) => {
    try {
      updateBlog(blog)
      setNotification(`Blog ${blog.title} now has ${blog.likes + 1} likes!`, 'success')
    } catch(exception) {
      setNotification(`${exception}`, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const title = blog.title
      if(window.confirm(`Do you want to delete ${title}?`)){
        destroyBlog(blog)
        setNotification(`${title} deleted successfully!`, 'success')
      }
      return
    } catch(exception) {
      setNotification(`${exception}`, 'error')
    }
  }
  console.log('blog', blog.user.username)
  const user = blog.user ? blog.user.username : 'Anon'
  const ownerLoggedIn = blog.user && (blog.user.name === currentUser.name)
  return (
    <div>
      <Card>
        <CardContent>
          <Box m={2}>
            <Typography component="h4" variant="h4">
              {blog.title} - by {blog.author}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {blog.likes} likes
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box m={2}>
            <Typography>
              URL: {blog.url}
            </Typography>
          </Box>
          <Divider variant="middle" />
        </CardContent>
        <CardActions>
          <Box width="50%" display="flex" justifyContent="center">
            <Button
              color="primary"
              variant="contained"
              onClick={() => addLike(blog)}
            >Add Like <span role="img" aria-label="heart"> 🖤</span></Button>
          </Box>
          <Box width="50%" display="flex" justifyContent="center" alignItems="center">
            {ownerLoggedIn &&
              <Button
                variant="contained"
                onClick={() => deleteBlog(blog)}>
                Delete
              </Button>
            }
            <Typography color="textSecondary">
              Added by {user}
            </Typography>
          </Box>
        </CardActions>
      </Card>
      <Paper>
        <CommentForm blog={blog} />
        <CommentList blog={blog} />
      </Paper>
    </div>
  )
}

Blog.propTypes = {
  setNotification: PropTypes.func.isRequired,
  destroyBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  blog: PropTypes.object
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = {
  setNotification,
  destroyBlog,
  updateBlog
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)
