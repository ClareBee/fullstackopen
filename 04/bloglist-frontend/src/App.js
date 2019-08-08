import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [successMessage])

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
        username, password,
      })
      // saved as DOMstring
      window.localStorage.setItem('name', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const loginForm = () => (
    <React.Fragment>
      <h2>Log in to application</h2>
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </React.Fragment>
  )

  const orderByLikes = blogs => (
    blogs.sort((a,b) => b.likes - a.likes)
  )

  const renderSortedBlogs = blogs => {
    const sorted = orderByLikes(blogs)
    return sorted.map(blog =>
      <Blog
        key={blog.title}
        blog={blog}
        addLike={addLike}
        deleteBlog={deleteBlog}
        currentUser={user}
      />
    )
  }

  const blogDisplay = () => {
    return (
      <React.Fragment>
        <Notification
          message={errorMessage || successMessage}
          messageType={errorMessage ? 'error' : 'success'}
        />
        <p>{ `${user.name} logged in` }</p>
        <button
          onClick={() => handleLogout()}
          type="button">Logout</button>
        <Toggleable buttonLabel="New Blog">
          <BlogForm addBlog={addBlog} />
        </Toggleable>
        <h2>blogs</h2>
        {renderSortedBlogs(blogs)}
      </React.Fragment>
    )
  }

  return (
    <div>
      { user
        ? blogDisplay()
        : loginForm() }
    </div>
  )
}

export default App
