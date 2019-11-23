import React, { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()

    const result = await props.login({
      variables: { username, password }
    })

    if (result) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('user-token', token)
      props.setPage('books')
    }
  }

  return (
    <div className="w-full max-w-xs m-auto">
      <form
        onSubmit={submit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 m-auto"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
          Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="******************"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
