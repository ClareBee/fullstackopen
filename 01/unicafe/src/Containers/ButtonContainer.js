import React from 'react'
import Header from '../Components/Header'
import Button from '../Components/Button'

const ButtonContainer = ({course}) => {
  return (
    <div>
      <Header title={course.feedbackTitle} />
      <Button text="good" />
      <Button text="neutral" />
      <Button text="bad" />
    </div>
  )
}

export default ButtonContainer
