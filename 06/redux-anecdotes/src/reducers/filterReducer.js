const reducer = (state = [], action) => {
  console.log('filter state now: ', state)
  console.log('filter action', action)
  switch(action.type) {
    case 'FILTER':
      const input = action.data.content
      return input
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

export default reducer
