import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  return (
    <span className={notification.style}>
      {notification.content}
    </span>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    content: PropTypes.string,
    style: PropTypes.string
  })
}
export default connect(mapStateToProps, null)(Notification)
