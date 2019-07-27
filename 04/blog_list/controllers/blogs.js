const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { name: 1, username: 1 })

  res.json(blogs.map(blog => blog.toJSON()))
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
  let user
  try {
    if (process.env.NODE_ENV !== 'test') {
      const decodedToken = jwt.verify(req.token, process.env.SECRET)
      if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
      user = await User.findById(decodedToken.id)
    } else {
      console.log(req.body.author)
      console.log(req.headers)
      const token = jwt.verify(req.headers.authorization.substring(7), process.env.SECRET)
      user = await User.findById(token.id)
      console.log('user', user)
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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
