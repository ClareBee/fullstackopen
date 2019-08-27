import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import { connect } from 'react-redux'
import { initialiseBlogs, destroyBlog, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import './index.css'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initialiseBlogs()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('name')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })
      // saved as DOMstring
      window.localStorage.setItem('name', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('name')
  }

  const blogDisplay = () => {
    return (
      <React.Fragment>
        <Notification />
        <div className="login-details">
          <button
            className="logout"
            onClick={() => handleLogout()}
            type="button">Logout</button>
          <h3>{ `Logged in as ${user.username}` }</h3>
        </div>
        <Toggleable buttonLabel="New Blog" className="success">
          <BlogForm currentUser={user}/>
        </Toggleable>
        <h2>Blogs</h2>
        <BlogList currentUser={user} />
      </React.Fragment>
    )
  }

  return (
    <div className="container">
      <h1>FullStack BlogApp</h1>
      { user
        ? blogDisplay(props.blogs)
        : <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        /> }
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initialiseBlogs,
  setNotification,
  destroyBlog,
  createBlog
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
