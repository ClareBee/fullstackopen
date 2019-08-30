import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return (
    <div className={notification.style}>
      {notification.content}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

Notification.propTypes = {
  // check this syntax
  notification: PropTypes.object.isRequired
}
export default connect(mapStateToProps, null)(Notification)
