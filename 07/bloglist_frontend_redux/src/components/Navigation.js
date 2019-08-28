import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BlogList from './BlogList'
import UserList from './UserList'

export const Navigation = ({ users }) => {
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
        </div>
      </Router>
    </div>
  )
}
