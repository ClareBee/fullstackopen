import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ButtonContainer from './Containers/ButtonContainer'
import StatsContainer from './Containers/StatsContainer'

const App = ({course}) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)

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

  const calcTotal = () => {
    setTotal(good + bad + neutral)
    return total
  }

  const calcAverage = () => {
    if (good > 0 || bad > 0) {
      return (good * 1) + (bad * -1) / total
    } else {
      return 0
    }
  }

  const calcPositive = () => {
    if (good > 0){
      return good/total * 100
    } else {
      return 0
    }
  }

  return (
    <React.Fragment>
      <ButtonContainer course={course} addVote={addVote}/>
      <StatsContainer
        course={course}
        bad={bad}
        good={good}
        neutral={neutral}
        total={() => calcTotal()}
        average={() => calcAverage()}
        positive={() => calcPositive()}
      />
    </React.Fragment>
  )
}

export default App
