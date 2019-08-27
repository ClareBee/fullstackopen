const reducer = (state = '', action) => {
  switch(action.type) {
  case 'NOTIFY':
    console.log('notify', action.data)
    return { content: action.data.anecdote, style: action.data.cssStyle }
  case 'REMOVE':
    return ''
  default:
    return state
  }
}

export const notify = (anecdote, cssStyle) => {
  return {
    type: 'NOTIFY',
    data: {
      anecdote,
      cssStyle
    }
  }
}

export const setNotification = (content, style) => {
  return async dispatch => {
    const trigger = await dispatch(notify(content, style))
    if(trigger){
      setTimeout(() => {
        dispatch({
          type: 'REMOVE'
        })
      }, 2000)
    }
  }
}
export default reducer
