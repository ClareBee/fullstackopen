import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Header from './Header'
import BlogList from './BlogList'
import UserList from './UserList'
import User from './User'
import Blog from './Blog'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'


const Navigation = ({ users, blogs, currentUser, handleLogout }) => {

  const userById = (id) =>
    users.find(a => a.id === id)

  const blogById = (id) =>
    blogs.find(a => a.id === id)

  return (
    <div>

      <Router>
        <div>
          <Toolbar component="nav" variant="dense" style={{ borderBottom: '1px solid grey', justifyContent: 'space-between', overflowX: 'auto',
          }}>
            {currentUser ?
              <div>
                <Button
                  onClick={() => handleLogout()}
                  type="button"
                  variant="outlined">Logout</Button>
                <h3>{ `Logged in as ${currentUser.username}` }</h3>
              </div>
              : null }
            <Link
              color="inherit"
              style={{ flexShrink: '0', padding: '10px' }}
              variant="body2"
              to='/'>Blogs</Link>
            <Link
              color="inherit"
              style={{ flexShrink: '0', padding: '10px' }}
              variant="body2"
              to='/users'>Users</Link>
          </Toolbar>
          <Header />
          <Route exact path="/" render={() => <BlogList />} />
          <Route exact path="/users" render={() => <UserList />} />
          <Route path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
          <Route path="/blogs/:id" render={({ match }) => <Blog blog={blogById(match.params.id)} />} />
        </div>
      </Router>
    </div>
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
