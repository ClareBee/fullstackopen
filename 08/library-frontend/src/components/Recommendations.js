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
        <h3 className="mb-4 text-gray-700">Your favourite genre is: <br/>
          <span className="text-pink-500">{user.favoriteGenre}</span></h3>
        <p className="mb-4 text-gray-700 underline">Here are your matches:</p>
        <ul className="list-inside list-none">
        {userBooks.map(book => (
          <li className="border border-gray-500 p-2 rounded-sm shadow" key={book.published}>{book.title}</li>
        ))}
        </ul>
      </React.Fragment>
    )
  }
  return (
    <div className="w-100 p-5 bg-gray-300 shadow-lg border-4 border-white rounded">
      <h1 className="text-3xl text-gray-700">Recommendations</h1>
      <hr className="h-1 bg-pink-700" />
      <div className="w-80 p-5 my-1 mx-auto bg-white">
        {formatBooks(books, user)}
      </div>
    </div>
  )
}

export default Recommendations
