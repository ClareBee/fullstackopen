import React, { useState, useEffect} from 'react';
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

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

  const addBlog = (e, blog) => {
    e.preventDefault()
    console.log('blog', blog)
    blogService
      .create(blog)
      .then(data => {
        setBlogs(blogs.concat(blog))
      })
  }

  const loginForm = () => (
    <React.Fragment>
      <Notification message={errorMessage}/>

      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Login</button>
      </form>
    </React.Fragment>
  )

  const blogDisplay = () => (
    <React.Fragment>
      <p>{ `${user.name} logged in` }</p>
      <button
        onClick={() => handleLogout()}
        type="button">Logout</button>
      <BlogForm addBlog={addBlog} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.title} blog={blog} />
      )}
    </React.Fragment>
  )

  return (
    <div>
      { user
       ? blogDisplay()
       : loginForm() }
    </div>
  )
}

export default App;
