const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// creates superagent object https://github.com/visionmedia/superagent
const api = supertest(app)

test('blog list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there is one blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(1)
})

test('the first blog is by Clare', async () => {
  const response = await api.get('/api/blogs')
  console.log(response)
  expect(response.body[0].author).toBe('Clare')
})

afterAll(() => {
  mongoose.connection.close()
})
