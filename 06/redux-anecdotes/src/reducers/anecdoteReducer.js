import anecdoteService from '../services/anecdotes'

const orderedByVote = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const anecdote = state.find(anecdote => anecdote.id === id)

      const editedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      const updatedState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : editedAnecdote
      )
      return orderedByVote(updatedState)
    case 'CREATE_ANECDOTE':
      const updatedAnecdotes = state.concat(action.data)
      return orderedByVote(updatedAnecdotes)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initialiseAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
