import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'

const USER_AND_BOOKS = gql`
{
  me  {
    username
    favoriteGenre
  }
  allBooks  {
    title
    published
    author {
      name
    }
    genres
  }
}
`

const Recommendations = ({ token, show }) => {
  const client = useApolloClient(USER_AND_BOOKS)
  const [books, setBooks] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    const showUser = async () => {
      const { data } = await client.query({
        query: USER_AND_BOOKS,
        fetchPolicy: 'no-cache'
      })
      setBooks(data.allBooks)
      setUser(data.me)
    }
    showUser()
  }, [])

  if (!show) {
    return null
  }

  if(!token){
    return (
      <p>You need to log in to see this page</p>
    )
  }
  const formatBooks = (books, user) => {
    const userBooks = books.filter(book => (
      book.genres.includes(user.favoriteGenre)
    ))
    if(!user.favoriteGenre){
      return (
        <p>You haven't chosen a favourite genre</p>
      )
    }
    if (userBooks.length === 0){
      return (
        <div>
          <p>Your favourite genre is {user.favoriteGenre}</p>
          <p>No books match this</p>
        </div>
      )
    }
    return (
      <div>
        <p>Your favourite genre is {user.favoriteGenre}</p>
        <ul>
        {userBooks.map(book => (
          <li key={book.published}>{book.title}</li>
        ))}
        </ul>
      </div>
    )
  }
  return (
    formatBooks(books, user)
  )
}

export default Recommendations
