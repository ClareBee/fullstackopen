import anecdoteService from '../services/anecdotes'

const orderedByVote = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_VOTE':
      const anecdote = action.data
      const id = anecdote.id
      const updatedState = state.map(existingAnecdote =>
        existingAnecdote.id !== id ? existingAnecdote : anecdote
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

export const addVote = anecdote => {
  return async dispatch => {
    const anecdoteUpdated = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(anecdoteUpdated)
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    })
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

export const initialiseAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
