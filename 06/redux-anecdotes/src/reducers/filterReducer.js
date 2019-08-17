const reducer = (state = [], action) => {
  console.log('filter state now: ', state)
  console.log('filter action', action)
  switch(action.type) {
    case 'FILTER':
      const input = action.data.content
      return input
    case 'RESET':
      return ''
    default:
      return state
  }
}

export const filterAnecdotes = (input) => {
  return {
    type: 'FILTER',
    data: {
      content: input
    }
  }
}

export const reset = () => {
  return {
    type: 'RESET'
  }
}

export default reducer
