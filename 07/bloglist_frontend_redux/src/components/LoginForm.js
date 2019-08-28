import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  username,
  password
}) => (
  <React.Fragment>
    <h2 className="login-header">Log in to application</h2>
    <Notification />

    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input
          {...username.inputValues()}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          {...password.inputValues()}
        />
      </div>
      <button className="success" type="submit">Login</button>
    </form>
  </React.Fragment>
)

export default LoginForm
