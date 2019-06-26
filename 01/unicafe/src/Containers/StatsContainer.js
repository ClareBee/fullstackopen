import React from 'react'
import Header from '../Components/Header'
import Result from '../Components/Result'

const StatsContainer = ({course, bad, good, neutral, total, average, positive}) => {
  return (
    <div>
      <Header title={course.statsTitle} />
      <Result value={bad} title='bad'/>
      <Result value={good} title='good'/>
      <Result value={neutral} title='neutral'/>
      <Result value={total()} title='total' />
      <Result value={average()} title='average' />
      <Result value={positive()} title='positive' percent />
    </div>
  )
}

export default StatsContainer
