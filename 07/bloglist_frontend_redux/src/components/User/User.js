import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: 4,
  },
}))

const User = ({ user, blogs }) => {
  const classes = useStyles()

  if ( user === undefined) {
    return null
  }

  const userBlogs = blogs.filter(
    blog => blog.user && (blog.user.id === user.id)
  )

  return (
    <Paper m={2} p={1}>
      <Typography component="h4" variant="h4">
        {user.name}
      </Typography>
      <Divider variant="middle" />

      <Typography component="h5" variant="h5">
        Added Blogs:
      </Typography>
      <Grid item xs={12} md={6}>
        <div className={classes.demo}>
          <List>
            { userBlogs && userBlogs.map(blog =>
              <Link data-cy="blog" to={`/blogs/${blog.id}`} key={blog.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={blog.title}
                  />
                </ListItem>
              </Link>
            )}
            { userBlogs.length === 0 && (
              <ListItem>
                <ListItemText primary="No blogs added by this user yet" />
              </ListItem>
            )}
          </List>
        </div>
      </Grid>
    </Paper>
  )
}

User.propTypes = {
  user: PropTypes.object,
  blogs: PropTypes.array
}

export default User
