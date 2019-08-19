import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const checkNotification = () => {
    const notification = props.notification
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
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)
