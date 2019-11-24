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
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-2xl tracking-tight">BookApp</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <button
              className="block mt-4 lg:inline-block lg:mt-0 text-2xl text-xl text-teal-200 hover:text-white mr-4"
              onClick={() => setPage('authors')}
            >
              Authors
            </button>
            <button
              className="block mt-4 lg:inline-block lg:mt-0 text-2xl text-teal-200 hover:text-white mr-4"
              onClick={() => setPage('books')}
            >
              Books
            </button>
          </div>
          {!token && (
            <div>
              <button
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-pink-500 hover:bg-white mt-4 lg:mt-0"
                onClick={() => setPage('login')}
              >
                Login
              </button>
            </div>
          )}
          {token && (
            <React.Fragment>
              <div>
                <button
                  className="block mt-4 lg:inline-block lg:mt-0 text-2xl text-teal-200 hover:text-white mr-4"
                  onClick={() => setPage('add')}
                >
                  Add book
                </button>
                <button
                  className="block mt-4 lg:inline-block lg:mt-0 text-2xl text-teal-200 hover:text-white mr-4"
                  onClick={() => setPage('recommendations')}
                >
                  Recommendations
                </button>
              </div>
              <div>
                <button
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </React.Fragment>
          )}
          </div>
      </nav>
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
