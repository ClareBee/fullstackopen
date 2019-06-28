import React from 'react'

const Button = ({text, addVote}) => {
  return (
    <button className={text} onClick={() => addVote(text)}>{text}</button>
  )
}

export default Button
