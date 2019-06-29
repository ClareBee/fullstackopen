import React, { useState } from 'react';
import './App.css';
import { Header } from './components/header'
import { Result } from './components/result'
import { Title } from './components/title'
import { Button } from './components/button'

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
    <div className="display">
      <div className="container">
        <Header text={'Progamming Anecdotes'} />
        <Title text={'Random Anecdote'} />
        <Result result={anecdotes[selected]} score={votes[selected]['vote']}/>
        <Button handleClick={generateRandomAnecdote} anecdotes={anecdotes} />
        <Title text={'Most Popular Anecdote'} />
        <Result result={anecdotes[highest['index']]} score={highest['vote']} />
      </div>
    </div>
  )
}


export default App;
