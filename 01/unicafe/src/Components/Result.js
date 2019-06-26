import React from 'react'

const Result = (props) => {
  return (
    <p>{props.title} {props.value} {props.percent ? '%' : ''}</p>
  )
}

export default Result
