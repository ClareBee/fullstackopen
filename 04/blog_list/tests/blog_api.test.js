const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// creates superagent object https://github.com/visionmedia/superagent
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blog list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blogs is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const authors = response.body.map(r => r.author)

  expect(authors).toContain(
    'Clare'
  )
})

afterAll(() => {
  mongoose.connection.close()
})
