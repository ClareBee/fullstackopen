const reducer = (state = null, action) => {
  switch(action.type) {
  case 'NOTIFY':
    return { content: action.data.notification, style: action.data.cssStyle }
  case 'REMOVE':
    return null
  default:
    return state
  }
}

export const notify = (notification, cssStyle) => {
  return {
    type: 'NOTIFY',
    data: {
      notification,
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
      }, 5000)
    }
  }
}
export default reducer
