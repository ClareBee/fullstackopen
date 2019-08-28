import userService from '../services/users'

const reducer = (state = '', action) => {
  console.log('userreducer', state)
  switch(action.type) {
  case 'ADD_CURRENT_USER':
    console.log('notify', action.data)
    return { ...state, currentUser: action.data }
  case 'REMOVE_CURRENT_USER':
    return { ...state, currentUser: null }
  case 'INITIALISE_USERS':
    console.log('users', action.data)
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
