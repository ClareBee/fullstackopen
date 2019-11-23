import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { USER_AND_BOOKS } from '../graphql/queries'

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
  }, [client])

  if (!show) {
    return null
  }

  if(!token){
    return (
      <p className="mb-4 text-gray-700">You need to log in to see this page</p>
    )
  }
  const formatBooks = (books, user) => {
    const userBooks = books.filter(book => (
      book.genres.includes(user.favoriteGenre)
    ))
    if(!user.favoriteGenre){
      return (
        <p className="mb-4 text-gray-700">You haven't chosen a favourite genre</p>
      )
    }
    if (userBooks.length === 0){
      return (
        <React.Fragment>
          <p className="mb-4 text-gray-700">Your favourite genre is {user.favoriteGenre}</p>
          <p className="mb-4 text-gray-700">No books currently match this</p>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <p className="mb-4 text-gray-700">Your favourite genre is {user.favoriteGenre}</p>
        <p className="mb-4 text-gray-700">Here are your matches:</p>
        <ul className="list-none">
        {userBooks.map(book => (
          <li key={book.published}>{book.title}</li>
        ))}
        </ul>
      </React.Fragment>
    )
  }
  return (
    <div className="w-100 p-5 m-2 bg-gray-300">
      {formatBooks(books, user)}
    </div>
  )
}

export default Recommendations
