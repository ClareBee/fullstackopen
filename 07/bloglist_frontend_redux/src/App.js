import React, { useEffect } from 'react'
import  { useField } from './hooks'
import { connect } from 'react-redux'
import { initialiseBlogs, destroyBlog, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { addUser, removeUser, initialiseUsers } from './reducers/userReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import './index.css'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const { initialiseBlogs, initialiseUsers, addUser } = props

  useEffect(() => {
    initialiseBlogs()
    initialiseUsers()
  },[initialiseBlogs, initialiseUsers])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('name')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      addUser(user)
      blogService.setToken(user.token)
    }
  }, [addUser])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })
      // saved as DOMstring
      window.localStorage.setItem('name', JSON.stringify(user))
      blogService.setToken(user.token)
      props.addUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    props.removeUser()
    window.localStorage.removeItem('name')
  }

  const blogDisplay = () => {
    return (
      <React.Fragment>
        <Navigation handleLogout={handleLogout} />
        <Notification />
      </React.Fragment>
    )
  }

  return (
    <div className="container">
      <h1>FullStack BlogApp</h1>
      { props.currentUser
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
  return {
    notification: state.notification,
    currentUser: state.user.currentUser,
    users: state.user.users
  }
}

const mapDispatchToProps = {
  initialiseBlogs,
  setNotification,
  destroyBlog,
  createBlog,
  addUser,
  removeUser,
  initialiseUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
