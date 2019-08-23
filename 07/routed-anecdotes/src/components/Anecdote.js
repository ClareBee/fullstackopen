import React from 'react'

export const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>{anecdote.author}</p>
    <p>Url: {anecdote.info}</p>
    <h3>Votes: {anecdote.votes}</h3>
  </div>
)
