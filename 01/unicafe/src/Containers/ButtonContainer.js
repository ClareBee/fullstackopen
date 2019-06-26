import React from 'react'
import Header from '../Components/Header'
import Button from '../Components/Button'

const ButtonContainer = ({course, addVote}) => {
  return (
    <div>
      <Header title={course.feedbackTitle} />
      <Button text="good" addVote={addVote} />
      <Button text="neutral" addVote={addVote} />
      <Button text="bad" addVote={addVote} />
    </div>
  )
}

export default ButtonContainer
