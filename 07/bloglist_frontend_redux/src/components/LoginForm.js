import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  password
}) => (
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
)

export default LoginForm
