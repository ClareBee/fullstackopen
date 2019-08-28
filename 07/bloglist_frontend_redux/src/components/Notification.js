import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }
  console.log('props', props)
  return (
    <div className={props.notification.style}>
      {props.notification.content}
    </div>
  )
}

const mapStateToProps = state => {
  console.log('state notify', state)
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)
