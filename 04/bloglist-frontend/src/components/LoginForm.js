import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  password
}) => (
  <form onSubmit={handleLogin}>
    <div>
      Username
      <input
        {...username.inputValues()}
      />
    </div>
    <div>
      Password
      <input
        {...password.inputValues()}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default LoginForm
