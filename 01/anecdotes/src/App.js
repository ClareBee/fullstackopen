import React, { useState } from 'react';
import './App.css';

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const generateRandomAnecdote = (list) => {
    const randomNum = Math.floor(Math.random() * Math.floor(list.length))
    if(randomNum === selected){
      return generateRandomAnecdote(list)
    }
    setSelected(randomNum)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <button onClick={() => generateRandomAnecdote(props.anecdotes)}>Get Anecdote</button>
    </div>
  )
}


export default App;
