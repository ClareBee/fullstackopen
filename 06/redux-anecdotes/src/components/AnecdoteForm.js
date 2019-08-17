import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addedSuccess, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(createAnecdote(content))
    store.dispatch(addedSuccess(content))
    setTimeout(() => {
      store.dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
