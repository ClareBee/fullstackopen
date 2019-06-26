import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ButtonContainer from './Containers/ButtonContainer'
import StatsContainer from './Containers/StatsContainer'

const App = ({course}) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addVote = (vote) => {
    if (vote === 'good'){
      setGood(good + 1)
    }
    if (vote === 'bad'){
      setBad(bad + 1)
    }
    if (vote === 'neutral'){
      setNeutral(neutral + 1)
    }
  }

  return (
    <React.Fragment>
      <ButtonContainer course={course} addVote={addVote}/>
      <StatsContainer course={course} bad={bad} good={good} neutral={neutral}/>
    </React.Fragment>
  )
}

export default App
