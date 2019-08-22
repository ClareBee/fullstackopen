const reducer = (state = '', action) => {
  switch(action.type) {
    case 'NOTIFY_SUCCESS':
      return action.data.anecdote
    case 'REMOVE':
      return ''
    default:
      return state
  }
}

export const notifySuccess = anecdote => {
  return {
    type: 'NOTIFY_SUCCESS',
    data: {
      anecdote: anecdote
    }
  }
}

export const setNotification = (content, duration) => {
  return async dispatch => {
    // not sure how to make this w async/await
    const trigger = await dispatch(notifySuccess(content))
    if(trigger){
      setTimeout(() => {
        dispatch({
          type: 'REMOVE'
        })
      }, duration)
    }
  }
}
export default reducer
