import React from 'react'
import Header from '../Components/Header'
import Result from '../Components/Result'

const StatsContainer = ({course, bad, good, neutral, total, average, positive, reveal}) => {
  return (
    <div>
      <Header title={course.statsTitle} />
      {reveal ?
        <React.Fragment>
          <Result value={bad} title='bad'/>
          <Result value={good} title='good'/>
          <Result value={neutral} title='neutral'/>
          <Result value={total()} title='total' />
          <Result value={average()} title='average' />
          <Result value={positive()} title='positive' percent />
        </React.Fragment>
        : <p>No feedback given</p>}
    </div>
  )
}

export default StatsContainer
