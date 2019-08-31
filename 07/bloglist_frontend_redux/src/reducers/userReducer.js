import userService from '../services/users'

const reducer = (state = { users: [], currentUser: null }, action) => {
  console.log('state', state)
  switch(action.type) {
  case 'ADD_CURRENT_USER':
    return { users: [...state.users], currentUser: action.data }
  case 'REMOVE_CURRENT_USER':
    return { users: [...state.users], currentUser: null }
  case 'INITIALISE_USERS':
    return { currentUser: { ...state.currentUser }, users: action.data }
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
