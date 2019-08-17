import React from 'react'

const Notification = ({ store }) => {

  const checkNotification = () => {
    const notification = store.getState().notification
    return notification ? 'inline-block' : 'none'
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: checkNotification()
  }

  return (
    <div style={style}>
      {store.getState().notification}
    </div>
  )
}

export default Notification
