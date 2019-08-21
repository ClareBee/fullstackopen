import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addedSuccess, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.addedSuccess(content)
    setTimeout(() => {
      props.removeNotification()
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


export default connect(null, {
  createAnecdote,
  addedSuccess,
  removeNotification
})(AnecdoteForm)
