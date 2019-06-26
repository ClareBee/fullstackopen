import React from 'react'
import Header from '../Components/Header'

const StatsContainer = ({course}) => {
  return (
    <div>
      <Header title={course.statsTitle} />
      Stats go here
    </div>
  )
}

export default StatsContainer
