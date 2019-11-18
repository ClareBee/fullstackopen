import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS, RECOMMENDED_BOOKS } from '../graphql/queries'
const uuidv4 = require('uuid/v4');


const Books = ({ show, client }) => {
  const [ genres, setGenres ] = useState('')
  const [ books, setBooks ] = useState([])
  const { loading, error, data } = useQuery(ALL_BOOKS)

  useEffect(() => {
    const dbBooks = data && data.allBooks
    setBooks(dbBooks)
  }, [data])

  useEffect(() => {
    if(books && books.length > 1){
      const allGenres = books.map(book => book.genres).flat().filter(genre => !!genre)
      const uniqueGenres = [...new Set(allGenres)]
      setGenres(uniqueGenres)
    }
    return;
  }, [books])

  if (!show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }

  if(!books){
    return (
      <p>No books</p>
    )
  }

  const showGenres = async (genre) => {
    const { data } = await client.query({
      query: RECOMMENDED_BOOKS,
      variables: { genre }
    })
    setBooks(data.allBooks)
  }

  const getAllBooks = async () => {
    const { data } = await client.query({
      query: ALL_BOOKS
    })
    setBooks(data.allBooks)
  }

  const handleGenre = (e) => {
    e.preventDefault()
    showGenres(e.target.value)
  }

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
        <button value={genre} key={uuidv4()} onClick={(e) => handleGenre(e)}>{genre}</button>
      ))}
      <button onClick={(e) => getAllBooks(e)}>All books</button>
    </div>
  )
}

export default Books
