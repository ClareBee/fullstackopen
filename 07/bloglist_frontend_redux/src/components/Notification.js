import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  console.log('notifi', notification)
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
  notification: PropTypes.shape({
    content: PropTypes.string,
    style: PropTypes.string
  })
}
export default connect(mapStateToProps, null)(Notification)
