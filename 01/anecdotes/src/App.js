import React, { useState } from 'react';
import './App.css';

const App = ({anecdotes}) => {
  const stateObject = () => {
    return anecdotes.map((anecdote, index) => {
      return {
        index,
        vote: 0
      }
    })
  }
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(stateObject)
  const [highest, setHighest] = useState(0)

  const getHighest = (scoresHash) => {
    const copy = [...scoresHash]
    return copy.reduce((previous, current) => {
      return previous['vote'] > current['vote'] ? previous : current
    })
  }

  const generateRandomAnecdote = (list) => {
    const randomNum = Math.floor(Math.random() * Math.floor(list.length))
    setSelected(randomNum)
    const copy = [...votes]
    copy[randomNum]['vote'] += 1
    setVotes(copy)
    const highest = getHighest(copy)
    setHighest(highest)
  }

  return (
    <div>
      {anecdotes[selected]}
      Number of Votes: {votes[selected]['vote']}
      <button onClick={() => generateRandomAnecdote(anecdotes)}>Get Anecdote</button>
      Anecdote with most votes:
      {anecdotes[highest['index']]} Votes: {highest['vote']}
    </div>
  )
}


export default App;
