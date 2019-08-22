import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You successfully added ${content}`, 5000)
  }

  return (
    <div class="form-container">
      <h2>Create a New Anecdote</h2>
      <form onSubmit={addAnecdote} className="form">
        <textarea name="anecdote" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}


export default connect(null, {
  createAnecdote,
  setNotification
})(AnecdoteForm)
