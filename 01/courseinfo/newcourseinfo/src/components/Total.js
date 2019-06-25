import React from 'react';

const Total = ({ parts }) => {
  const exercises = parts.map(item => item.exercises);
  return (
    <p>Number of exercises {exercises.reduce((acc, item) => acc + item)}</p>
  )
}

export default Total;
