import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { votedSuccess, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {
  const { anecdotes, filter } = store.getState()

  const anecdotesToDisplay = () => {
    if(filter.length < 1){
      console.log('hi')
      return anecdotes
    } else {
      const normalisedFilter = filter.toUpperCase()
      return anecdotes.filter(anecdote => {
        return anecdote.content
                .toUpperCase()
                .match(normalisedFilter)
      })  
    }
  }
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
      {anecdotesToDisplay().map(anecdote =>
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
