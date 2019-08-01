import React from 'react'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }
  console.log('message', message)
  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default Notification
