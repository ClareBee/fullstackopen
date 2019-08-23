import React from 'react'
import { Link } from 'react-router-dom'

export const AnecdoteList = ({ anecdotes }) => {
  console.log('anecdotes', anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )}
      </ul>
    </div>
    )
}
