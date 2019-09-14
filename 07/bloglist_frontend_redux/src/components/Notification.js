import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { green, red } from '@material-ui/core/colors'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: red[600],
    }
  }))
  return (
    <Snackbar
      anchorOrigin={`${'top'},${'center'}`}
      key={`${'top'},${'center'}`}
      className={notification.style}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{notification.content}</span>}
    />
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
