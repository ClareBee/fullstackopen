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

afterAll(() => {
  mongoose.connection.close()
})
