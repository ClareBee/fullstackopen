import React from 'react'
import Header from './header'
import Part from './part'

const Course = ({course}) => {
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
    </React.Fragment>
  )
}

export default Course
