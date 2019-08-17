import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({store}) => {
  const vote = (id) => {
    console.log('vote', id)
    store.dispatch(addVote(id))
  }

  return (
    <div>
      {store.getState().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList
