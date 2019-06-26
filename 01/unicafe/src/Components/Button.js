import React from 'react'

const Button = ({text, addVote}) => {
  return (
    <button onClick={() => addVote(text)}>{text}</button>
  )
}

export default Button
