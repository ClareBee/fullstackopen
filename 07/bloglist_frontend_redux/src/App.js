import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import  { useField } from './hooks'
import { connect } from 'react-redux'
import { initialiseBlogs, destroyBlog, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { addUser, removeUser, initialiseUsers } from './reducers/userReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}))
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

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm"gat>
        <Notification />
        { props.currentUser
          ? <Navigation handleLogout={handleLogout} />
          : <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
          /> }
      </Container>
      <Footer />
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
