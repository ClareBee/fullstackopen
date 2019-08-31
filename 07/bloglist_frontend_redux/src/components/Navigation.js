import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'
import UserList from './UserList'
import User from './User'
import Blog from './Blog'

const Navigation = ({ users, blogs, currentUser, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }
  const userById = (id) =>
    users.find(a => a.id === id)

  const blogById = (id) =>
    blogs.find(a => a.id === id)

  return (
    <div>
      {currentUser ?
        <div className="login-details">
          <button
            className="logout"
            onClick={() => handleLogout()}
            type="button">Logout</button>
          <h3>{ `Logged in as ${currentUser.username}` }</h3>
        </div>
        : null }
      <Router>
        <div>
          <div>
            <Link to='/' style={padding}>Blogs</Link>
            <Link to='/users' style={padding}>Users</Link>
          </div>
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
