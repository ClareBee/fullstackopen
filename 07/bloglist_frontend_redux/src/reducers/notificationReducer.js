const reducer = (state = '', action) => {
  switch(action.type) {
  case 'NOTIFY':
    return { content: action.data.notification, style: action.data.cssStyle }
  case 'REMOVE':
    return ''
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
      }, 2000)
    }
  }
}
export default reducer
