import React from 'react';

const Total = (props) => {
  console.log(props)
  const exercises = props.parts.map(item => item.exercises);
  return (
    <p>Number of exercises {exercises.reduce((acc, item) => acc + item)}</p>
  )
}

export default Total;
