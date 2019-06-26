import React from 'react'
import Header from '../Components/Header'
import Statistic from '../Components/Statistic'

const StatsContainer = ({course, bad, good, neutral, total, average, positive, reveal}) => {
  return (
    <div>
      <Header title={course.statsTitle} />
      {reveal ?
        <React.Fragment>
          <Statistic value={bad} title='bad'/>
          <Statistic value={good} title='good'/>
          <Statistic value={neutral} title='neutral'/>
          <Statistic value={total()} title='total' />
          <Statistic value={average()} title='average' />
          <Statistic value={positive()} title='positive' percent />
        </React.Fragment>
        : <p>No feedback given</p>}
    </div>
  )
}

export default StatsContainer
