import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE_BLOG': {
    const blogs = [...state]
    return blogs.concat(action.data)
  }
  case 'UPDATE_BLOG': {
    const blogs = [...state]
    const updatedBlog = { ...action.data }
    return  blogs.map(blog => blog.id === action.data.id ? updatedBlog : blog )
  }
  case 'DESTROY_BLOG': {
    const blogs = [...state]
    const destroyed =  blogs.filter(blog => blog.id !== action.data.blog.id)
    return destroyed
  }
  case 'GET_ALL_BLOGS':
    return action.data
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    if(newBlog.data){
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog.data
      })
    }
    // why doesn't importing and calling setNotification work here?
    if(newBlog.error){
      dispatch({
        type: 'NOTIFY',
        data: { notification: `${newBlog.error}`, cssStyle: 'error' }
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE'
        })
      }, 5000)
    }
  }
}

export const updateBlog = blog => {
  let blogLikes = blog.likes
  const { id, title, author, url } = blog
  const editedBlog = { id, title, author, url, likes: blogLikes += 1 }
  return async dispatch => {
    const updatedBlog = await blogService.update(editedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog.data
    })
  }
}

export const destroyBlog = blog => {
  return async dispatch => {
    const destroyed = await blogService.destroy(blog)
    dispatch({
      type: 'DESTROY_BLOG',
      data: { destroyed: destroyed.data, blog }
    })
  }
}

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_ALL_BLOGS',
      data: blogs,
    })
  }
}

export const commentOnBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(blog, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog.data
    })
  }
}

export default reducer
