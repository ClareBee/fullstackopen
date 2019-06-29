import React from 'react'

export const Button = (props) => {
  console.log(props)
  return (
    <button onClick={() => props.handleClick(props.anecdotes)}>Random Anecdote</button>
 )
}
