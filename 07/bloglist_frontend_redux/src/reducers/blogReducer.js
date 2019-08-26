import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'CREATE_BLOG':
    return state
  case 'UPDATE_BLOG':
    return state
  case 'DESTROY_BLOG':
    return action.data
  case 'GET_ALL_BLOGS':
    console.log(action)
    return action.data
  default:
    return state
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = content => {
  return async dispatch => {
    const updatedBlog = await blogService.update(content)
    dispatch({
      type: 'CREATE_BLOG',
      data: updatedBlog
    })
  }
}

export const destroyBlog = content => {
  return async dispatch => {
    const destroyed = await blogService.destroy(content)
    dispatch({
      type: 'DESTROY_BLOG',
      data: destroyed
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
