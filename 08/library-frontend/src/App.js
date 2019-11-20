import React, { useState } from 'react'
import { useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'
import { LOGIN, ADD_BOOK } from './graphql/mutations'
import { ALL_BOOKS } from './graphql/queries'
import { BOOK_ADDED } from './graphql/subscription'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => {
      return set.map(p => p.title).includes(object.title)
    }
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
     setErrorMessage(null)
    }, 10000)
  }

  const [addBook] = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

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
    <div className="w-3/4 my-4 m-auto">
      <div className="bg-white h-12 flex justify-between m-2">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPage('authors')}
        >
          Authors
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPage('books')}
        >
          Books
        </button>
        {!token && (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPage('login')}
          >
            Login
          </button>
        )}
        {token && (
          <React.Fragment>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setPage('add')}
            >
              Add book
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setPage('recommendations')}
            >
              Recommendations
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </React.Fragment>
        )}
      </div>
      {errorNotification()}
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} client={client} />
      <NewBook show={page === 'add'} addBook={addBook} />
      <Recommendations show={page === 'recommendations'} token={token} />
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
