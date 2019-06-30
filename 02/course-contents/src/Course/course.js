import React from 'react'
import Header from './header'
import Part from './part'
import Total from './total'

const Course = ({course}) => {

  const calculateTotal = course.parts.reduce((previous, current) => {
     return previous + current.exercises
  }, 0)

  return (
    <React.Fragment>
      <Header name={course.name} />
      {course.parts.map(part =>
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
          id={part.id}
        />
      )}
      <Total total={calculateTotal} />
    </React.Fragment>
  )
}

export default Course
