import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Header from './Components/Header'

const App = ({course}) => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <React.Fragment>
      <Header title={course.title} />
    </React.Fragment>
  )
}

export default App
