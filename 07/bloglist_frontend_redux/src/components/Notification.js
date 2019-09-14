import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/styles'
import { connect } from 'react-redux'
import Box from '@material-ui/core/Box'
import { pink, lightGreen } from '@material-ui/core/colors'

const Success = styled(Box)({
  backgroundColor: lightGreen[500],
  fontWeight: 'bold',
  color: 'white',
  padding: '10px',
  border: '1px solid black'
})

const Error = styled(Box)({
  backgroundColor: pink[500],
  fontWeight: 'bold',
  color: 'white',
  padding: '10px',
  border: '1px solid black'
})

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const { style, content } = notification
  if (style === 'error') {
    return (
      <Error>
        {content}
      </Error>
    )
  } else {
    return (
      <Success>
        {content}
      </Success>
    )
  }
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
