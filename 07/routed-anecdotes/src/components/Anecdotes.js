import React from 'react'

export const Anecdotes = ({ anecdotes }) => {
  console.log('anecdotes', anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
      </ul>
    </div>
    )
}
