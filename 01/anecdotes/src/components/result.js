import React from 'react'

export const Result = (props) => {
  return (
    <div className="result">
      <div class="anecdote">
        <h3>{props.result}</h3>
      </div>
      <div>
        <span class="label">Votes:</span>
        <span class="votes">{props.score}</span>
      </div>
    </div>
  )
}
