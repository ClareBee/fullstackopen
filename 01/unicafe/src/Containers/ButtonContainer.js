import React from 'react'
import Header from '../Components/Header'
import Button from '../Components/Button'

const ButtonContainer = ({course}) => {
  return (
    <div>
      <Header title={course.feedbackTitle} />
      <Button />
      <Button />
      <Button />
    </div>
  )
}

export default ButtonContainer
