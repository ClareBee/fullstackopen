const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    name: 'Bob',
    password: 'BobsPassword',
    username: 'bobby'
  }
]
const initialBlogs = [
  {
    title: 'Testing Title',
    author: 'Clare',
    url: 'http://www.example.com/claresblog',
    likes: 5,
  },
  {
    title: 'Second Testing Title',
    author: 'Bob',
    url: 'http://www.example.com/bobsblog',
    likes: 10,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'soontoberemoved', author: 'random', url: 'https://www.example.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
