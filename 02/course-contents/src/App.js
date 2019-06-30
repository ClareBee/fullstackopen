import React from 'react';
import './App.css';
import Course from './Course/course'

const App = ({courses}) => {
  const courseData = 
    courses.map(course => <Course course={course} key={course.id} />)

  return (
    <div>
      {courseData}
    </div>
  )
}

export default App;
