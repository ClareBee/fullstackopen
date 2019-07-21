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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlogs
}
