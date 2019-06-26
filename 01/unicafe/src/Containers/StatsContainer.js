import React from 'react'
import Header from '../Components/Header'
import Result from '../Components/Result'

const StatsContainer = ({course, bad, good, neutral}) => {
  return (
    <div>
      <Header title={course.statsTitle} />
      <Result value={bad} title='bad'/>
      <Result value={good} title='good'/>
      <Result value={neutral} title='neutral'/>
    </div>
  )
}

export default StatsContainer
