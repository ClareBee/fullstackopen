import React from 'react'

const Statistic = (props) => {
  return (
    <p>{props.title} {props.value} {props.percent ? '%' : ''}</p>
  )
}

export default Statistic
