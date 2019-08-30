import userService from '../services/users'

const reducer = (state = '', action) => {
  switch(action.type) {
  case 'ADD_CURRENT_USER':
    return { ...state, currentUser: action.data }
  case 'REMOVE_CURRENT_USER':
    return { ...state, currentUser: null }
  case 'INITIALISE_USERS':
    return { ...state, users: action.data }
  default:
    return state
  }
}

export const initialiseUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITIALISE_USERS',
      data: users,
    })
  }
}

export const addUser = user => {
  return {
    type: 'ADD_CURRENT_USER',
    data: user
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_CURRENT_USER'
  }
}
export default reducer
