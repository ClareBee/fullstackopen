import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'

import BOOK_DETAILS from './fragments/book_fragment'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import LoginForm from './components/LoginForm'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const ALL_BOOKS = gql`
  {
    allBooks  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
const ADD_BOOK = gql`
  mutation AddBook($title: String!, $authorInput: AuthorInput!, $published: Int!, $genres: [String!]) {
    addBook (
      title: $title
      authorInput: $authorInput
      published: $published
      genres: $genres
    ){
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

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
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)
    console.log('added book', addedBook)
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
      console.log('subscription', subscriptionData)
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
      console.log('response', response.data)
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
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={logout}>logout</button>
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
