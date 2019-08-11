const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'This is my First Blog',
    date: '2019-06-11T16:38:15.541Z',
    author: 'Fred',
    url: 'http://www.fred.com',
    likes: 1,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'freddy',
      name: 'Fred'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'My Second Blog',
    date: '2019-06-11T16:38:57.694Z',
    author: 'Fred',
    url: 'http://www.fred.com',
    likes: 2,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'freddy',
      name: 'Fred'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'Jane\'s writings',
    date: '2019-06-11T16:39:12.713Z',
    author: 'Jane',
    url: 'http://www.jane.com',
    likes: 3,
    user: {
      _id: '5a437a9e514ab7f168ddf139',
      username: 'Jane',
      name: 'Jane'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  return true
}

export default { getAll, setToken }
