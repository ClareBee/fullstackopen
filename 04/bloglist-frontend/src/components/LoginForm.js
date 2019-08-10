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
        {...username}
      />
    </div>
    <div>
      Password
      <input
        {...password}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default LoginForm
