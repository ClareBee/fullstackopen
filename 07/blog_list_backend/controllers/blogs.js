const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { name: 1, username: 1 })
    .populate('comments', { comment: 1 })
  console.log('bloggy', blogs)
  res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog
      .findById(req.params.id)
      .populate('user', { name: 1, username: 1 })
      .populate('comments', { comment: 1 })
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
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const users = await User.find({username: decodedToken.username})
    user = users[0]
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })
    const savedBlog = await blog.save()
    const populatedBlog = await Blog
      .findById(savedBlog.id)
      .populate('user', { name: 1, username: 1 })
      .populate('comments', { comment: 1 })
    res.json(populatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  let blog = await Blog.findById(req.params.id)
  let decodedTokenId
  let user
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id || !blog.user) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    decodedTokenId = decodedToken.id.toString()
    if (blog.user.toString() === (decodedTokenId || user._id.toString())){
      await blog.delete()
      res.status(204).end()
    } else {
      return res.status(401).json({ error: 'You are not the owner of this blog' })
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  console.log('body', body)
  const blog = { ...req.body }

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(req.params.id, blog, { new: true })
      .populate('user', { name: 1, username: 1 })
      .populate('comments', { comment: 1 })
    console.log('oop', updatedBlog)
    res.json(updatedBlog.toJSON())
  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
  const body = req.body
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('user', { name: 1, username: 1 })
      .populate('comments', { comment: 1 })
    const comment = new Comment({
      comment: body.comment,
      blog:   blog._id
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment)
    const savedBlog = await blog.save()
    res.json(savedBlog)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter
