import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'
import UserList from './UserList'
import User from './User'

const Navigation = ({ users }) => {
  const padding = {
    paddingRight: 5
  }
  const userById = (id) =>
    users.find(a => a.id === id)

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to='/' style={padding}>blogs</Link>
            <Link to='/users' style={padding}>users</Link>
          </div>
          <Route exact path="/" render={() => <BlogList />} />
          <Route exact path="/users" render={() => <UserList />} />
          <Route path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
        </div>
      </Router>
    </div>
  )
}

Navigation.propTypes = {
  users: PropTypes.array
}


export default Navigation
