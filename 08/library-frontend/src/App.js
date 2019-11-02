import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')


  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
     setErrorMessage(null)
    }, 10000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && (
          <button onClick={() => setPage('login')}>login</button>
        )}
        {token && (
          <React.Fragment>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </React.Fragment>
        )}
      </div>
      {errorNotification()}
      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      {!token && (
        <LoginForm
          show={page === 'login'}
          login={login}
          setToken={(token) => setToken(token)}
          setPage={setPage}
        />
      )}

    </div>
  )
}

export default App
