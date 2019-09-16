import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Header from './Header'
import Notification from './Notification'
import BlogList from './BlogList'
import UserList from './UserList'
import User from './User'
import Blog from './Blog'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.accent}`,
  },
  toolbar: {
    marginTop: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  link: {
    margin: theme.spacing(1, 1.5),
    fontSize: '1.5rem'
  },
  'link:hover': {
    color: theme.palette.accent
  },
  'link:active':{
    color: theme.palette.accent
  },
  logout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const Navigation = ({ users, blogs, currentUser, handleLogout }) => {

  const userById = (id) =>
    users.find(a => a.id === id)

  const blogById = (id) =>
    blogs.find(a => a.id === id)

  const classes = useStyles()

  return (
    <Router>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.link} to="/">
            <Typography variant="h4">
              BlogApp
            </Typography>
          </Link>
          <nav>
            <Link className={classes.link} to="/">Blogs</Link>
            <Link className={classes.link} to="/users">Users</Link>
          </nav>
          {currentUser ?
            <div className={classes.logout}>
              <Button
                onClick={() => handleLogout()}
                type="button"
                data-cy="logout"
                variant="outlined">Logout</Button>
              <h3>{ `Logged in as ${currentUser.username}` }</h3>
            </div>
            : null }
        </Toolbar>
      </AppBar>
      <Header />
      <Notification />
      <Route exact path="/" render={() => <BlogList />} />
      <Route exact path="/users" render={() => <UserList />} />
      <Route path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} blogs={blogs}/>} />
      <Route path="/blogs/:id" render={({ match }) => <Blog blog={blogById(match.params.id)} />} />
    </Router>
  )
}

Navigation.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object,
  blogs: PropTypes.array
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    blogs: state.blogs,
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps, null)(Navigation)
