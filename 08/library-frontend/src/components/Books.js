
import React, { useState, useEffect } from 'react'
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

const RECOMMENDED_BOOKS = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre)  {
      title
      published
      author {
        name
      }
      genres
    }
  }
`
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
      setGenres(allGenres)
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
    console.log('client', client)
    const { data } = await client.query({
      query: RECOMMENDED_BOOKS,
      variables: { genre }
    })
    setBooks(data.allBooks)
  }

  const handleGenre = (e) => {
    e.preventDefault()
    showGenres(e.target.value)

    // setChosenGenre(e.target.value)
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
        <button value={genre} key={genre} onClick={(e) => handleGenre(e)}>{genre}</button>
      ))}
    </div>
  )
}

export default Books
