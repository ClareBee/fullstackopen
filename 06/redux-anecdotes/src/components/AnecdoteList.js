import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { votedSuccess, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {
  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    store.dispatch(addVote(anecdote.id))
    store.dispatch(votedSuccess(anecdote.content))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {store.getState().anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList
