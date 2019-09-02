import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const LoginForm = ({
  handleLogin,
  username,
  password
}) => (
  <React.Fragment>
    <Typography
      component="h2"
      variant="h5"
      color="inherit"
      align="center"
      style={{ flex: 1 }}
    >
    Log in to application
    </Typography>
    <Notification />

    <form onSubmit={handleLogin}>
      <div>
        <TextField label="Username"
          InputProps={{ ...username.inputValues() }}
        />
      </div>
      <div>
        <TextField label="Password" type="password"
          InputProps={{ ...password.inputValues() }}
        />
      </div>
      <Button variant="outlined" type="submit">Login</Button>
    </form>
  </React.Fragment>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object,
  password: PropTypes.object
}

export default LoginForm
