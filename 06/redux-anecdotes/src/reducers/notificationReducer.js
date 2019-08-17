const reducer = (state = '', action) => {
  console.log('notification state now: ', state)
  console.log('notification action', action)
  let anecdote = state.notification
  switch(action.type) {
    case 'ADDED_SUCCESS':
      anecdote = action.data.anecdote
      return `Successfully added: ${anecdote}`
    case 'VOTED_SUCCESS':
      anecdote = action.data.anecdote
      return `You added your vote for ${anecdote}`
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export const addedSuccess = (anecdote) => {
  return {
    type: 'ADDED_SUCCESS',
    data: {
      anecdote: anecdote
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export const votedSuccess = (anecdote) => {
  return {
    type: 'VOTED_SUCCESS',
    data: {
      anecdote: anecdote
    }
  }
}
export default reducer
