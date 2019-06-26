import React from 'react'
import Header from '../Components/Header'
import Statistic from '../Components/Statistic'

const StatsContainer = (props) => {
  return (
    <div>
      <Header title={props.course.statsTitle} />
      {props.reveal ?
        <React.Fragment>
          <Statistic value={props.good} title='good'/>
          <Statistic value={props.neutral} title='neutral'/>
          <Statistic value={props.bad} title='bad'/>

          <Statistic value={props.total()} title='total' />
          <Statistic value={props.average()} title='average' />
          <Statistic value={props.positive()} title='positive' percent />
        </React.Fragment>
        : <p>No feedback given</p>}
    </div>
  )
}

export default StatsContainer
