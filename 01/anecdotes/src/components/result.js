import React from 'react'

export const Result = (props) => {
  return (
    <div>
      <h3>{props.result}</h3>
      <p>{props.score}</p>
    </div>
  )
}
