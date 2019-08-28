import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG': {
    const blogs = [...state]
    return blogs.map(blog => blog.id === action.data.id ? action.data : blog)
  }
  case 'DESTROY_BLOG': {
    const blogs = [...state]
    return blogs.filter(blog => blog.id !== action.data.blog.id)
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
    console.log(newBlog)
    if(newBlog.data){
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog.data
      })
    }
    if(newBlog.error){
      dispatch({
        type: 'NOTIFY',
        data: { notification: `${newBlog.error}`, cssStyle: 'error' }
      })
    }
  }
}

export const updateBlog = blog => {
  let blogLikes = blog.likes
  const editedBlog = { ...blog, likes: blogLikes += 1 }
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

export default reducer
