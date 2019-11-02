
import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
{
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
const Books = ({ show }) => {
  const [ chosenGenre, setChosenGenre ] = useState('')
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }

  const dbBooks = data.allBooks
  const books =
    !chosenGenre ? dbBooks :
    dbBooks.filter(book => book.genres.includes(chosenGenre))
  console.log('books', books)
  if(!books){
    return (
      <p>No books</p>
    )
  }
  const handleGenre = (e) => {
    e.preventDefault()
    setChosenGenre(e.target.value)
  }
  const genres = dbBooks.map(book => book.genres).flat().filter(genre => !!genre)
  return (
    <div>
      <h2>books</h2>
      {error &&
         <div style={{ color: 'red' }}>
           {error}
         </div>
      }
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              genres
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author && book.author.name}</td>
              <td>{book.genres && book.genres.map(genre => genre)}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => (
        <button value={genre} key={genre} onClick={(e) => handleGenre(e)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books
