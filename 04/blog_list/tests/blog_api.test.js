const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// creates superagent object https://github.com/visionmedia/superagent
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
let token

beforeAll(async () => {
  const request = await api.post('/api/users')
    .send({
      username: 'newone',
      name: 'New',
      password: 'abcde'
    })
  const newUser = request.body
  const response = await api.post('/api/login')
    .send({
      username: newUser.username,
      password: 'abcde',
    })
  token = response.body.token
})

describe('when there are initially some blogs saved', () => {
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

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)

    expect(authors).toContain(
      'Clare'
    )
  })

  describe('addition of a new blog', () => {

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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
      const newBlog = {
        title: 'Something',
        author: 'Sally',
        url: '',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with status 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = 'abc'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
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
      const addedBlog = await api
        .post('/api/blogs')
        .send(blogMissingLikes)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(addedBlog.body.likes).toEqual(0)
    })
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const authors = blogsAtEnd.map(r => r.author)

    expect(authors).not.toContain(blogToDelete.author)
  })

  test('a blog can be edited', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const originalBlog = blogsAtStart[0]
    const id = originalBlog.id
    const edits = {
      title: 'edited',
      author: 'new author',
      url: 'http://www.example.com/whatever',
    }

    const editedBlog = await api
      .put(`/api/blogs/${id}`)
      .send(edits)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(editedBlog.body.author).toEqual('new author')
  })

})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
})
