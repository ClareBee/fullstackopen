var groupBy = require('lodash/groupBy')
var sortBy = require('lodash/sortBy')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => {
    return prev + curr.likes
  }, 0)
}

const favouriteBlogs = (blogs) => {
  return blogs.reduce((prev, curr) => {
    return curr.likes > prev.likes ? curr : prev
  })
}

const mostBlogs = (blogs) => {
  const grouped = groupBy(blogs, 'author')
  const sorted = sortBy(grouped, 'length')
  const most = sorted[sorted.length - 1]
  return {
    author: most[0].author,
    blogs: most.length
  }
}

const mostLikedAuthor = (blogs) => {
  const grouped = groupBy(blogs, 'author')
  const sortedByLikes = Object.keys(grouped).map(group => {
    return {
      likes: totalLikes(grouped[group]),
      author: group
    }
  })
  return favouriteBlogs(sortedByLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlogs,
  mostBlogs,
  mostLikedAuthor
}
