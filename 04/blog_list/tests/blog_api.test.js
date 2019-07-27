const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// creates superagent object https://github.com/visionmedia/superagent
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  // prevents tests running before async operations in beforeEach complete
  await Promise.all(promiseArray)
})

test('blog list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blogs is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const authors = response.body.map(r => r.author)

  expect(authors).toContain(
    'Clare'
  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'new',
    author: 'Sally',
    url: 'http://www.example.com/sallysblog',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(n => n.author)
  expect(authors).toContain(
    'Sally'
  )
})

test('blog without title is not added', async () => {
  const newBlog = {
    title: '',
    author: 'Sally',
    url: 'http://www.example.com/sallysblog',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body).toEqual(blogToView)
})

test('the unique identifier of a blog is id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultBlog.body.id).toBeDefined()
})

test('likes on blog defaults to 0 if missing', async () => {
  const blogMissingLikes = {
    title: 'No likes',
    author: 'Jim',
    url: 'http://www.example.com/jimsblog',
  }
  await api
    .post('/api/blogs')
    .send(blogMissingLikes)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const newlyAddedBlog = blogsAtEnd.find(blog => blog.author === 'Jim')
  expect(newlyAddedBlog.likes).toEqual(0)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    helper.initialBlogs.length - 1
  )

  const authors = blogsAtEnd.map(r => r.author)

  expect(authors).not.toContain(blogToDelete.author)
})

afterAll(() => {
  mongoose.connection.close()
})
