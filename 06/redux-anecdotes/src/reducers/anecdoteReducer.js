const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const orderedByVote = (anecdotes) => {
  console.log('sorted', anecdotes.sort((a, b) => a.votes - b.votes))
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
      const newAnecdote = {
        content: action.data.anecdote,
        votes: 0,
        id: getId()
      }
      const updatedAnecdotes = state.concat(newAnecdote)
      return orderedByVote(updatedAnecdotes)
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

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      anecdote: anecdote
    }
  }
}

export default reducer
