import React from 'react'

const Notification = ({ message }) => {
  if(message === null){
    return null
  }
  const style = `notification ${message.type}`
  return (
    <div className={style}>
      {message.content}
    </div>
  )
}

export default Notification
