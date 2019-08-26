import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import { connect } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import './index.css'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initialiseBlogs()
  },[successMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('name')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
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
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('name')
  }

  const addBlog = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(addedBlog))
      setSuccessMessage(`${addedBlog.title} added successfully!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      console.log('exception', exception)
      setErrorMessage(`${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const title = blog.title
      if(window.confirm(`Do you want to delete ${title}?`)){
        const deletedBlog = await blogService.destroy(blog)
        console.log(deletedBlog)
        setSuccessMessage(`${title} deleted successfully!`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
      return
    } catch(exception) {
      console.log('exception', exception)
      setErrorMessage(`${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    let blogLikes = blog.likes
    const blogWithAddedLike = { ...blog, likes: blogLikes += 1 }
    try {
      const editedBlog = await blogService.update(blogWithAddedLike)
      setSuccessMessage(`Blog ${editedBlog.title} now has ${editedBlog.likes} likes!`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      console.log('exception', exception)
      setErrorMessage(`${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogDisplay = () => {
    return (
      <React.Fragment>
        <Notification
          message={errorMessage || successMessage}
          messageType={errorMessage ? 'error' : 'success'}
        />
        <div className="login-details">
          <button
            className="logout"
            onClick={() => handleLogout()}
            type="button">Logout</button>
          <h3>{ `Logged in as ${user.username}` }</h3>
        </div>
        <Toggleable buttonLabel="New Blog" className="success">
          <BlogForm addBlog={addBlog} deleteBlog={deleteBlog} currentUser={user}/>
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
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
