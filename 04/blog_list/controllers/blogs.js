const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs.map(blog => blog.toJSON()))
  })
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (exception){
    next(exception)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const user = await User.findById(body.userId)
  console.log(user)
  const id = user ? user.id : null
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    userId: id
  })
  try {
    const savedBlog = await blog.save()
    if (user){
      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()
    }
    res.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(updatedBlog.toJSON())
  } catch(error) {
    console.log(error)
    next(error)
  }
})

module.exports = blogsRouter
