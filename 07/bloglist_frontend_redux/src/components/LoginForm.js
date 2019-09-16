import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  input: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: '100%',
    color: 'white'
  }
}))

const LoginForm = ({
  handleLogin,
  username,
  password
}) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          style={{ flex: 1 }}
        >
        Log in to application
        </Typography>
        <form onSubmit={handleLogin}>
          <Notification />

          <div>
            <TextField
              data-cy="username"
              label="Username"
              id="username"
              className={classes.input}
              InputProps={{ ...username.inputValues() }}
            />
          </div>
          <div>
            <TextField
              label="Password"
              data-cy="password"
              id="password"
              type="password"
              className={classes.input}
              InputProps={{ ...password.inputValues() }}
            />
          </div>
          <Button
            className={classes.button}
            data-cy="login"
            color="primary"
            variant="contained"
            type="submit">Login</Button>
        </form>
      </Paper>
    </React.Fragment>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object,
  password: PropTypes.object
}

export default LoginForm
