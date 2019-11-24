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

  const sortedByTitle = array => {
    return array.sort((a, b) => {
      let textA = a.title.toLowerCase();
      let textB = b.title.toLowerCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
  }

  return (
    <div className="w-100 p-5 m-2 bg-gray-300">
      <h2 className="text-3xl text-gray-700">Books</h2>
      <hr className="h-1 bg-pink-700" />

      {error &&
         <div style={{ color: 'red' }}>
           {error}
         </div>
      }
      <table className="table-auto mb-4">
        <tbody>
          <tr>
            <th className="w-1/2 px-4 py-2 text-left text-gray-700">
              Title
            </th>
            <th className="w-1/2 px-4 py-2 text-left text-gray-700">
              Author
            </th>
            <th className="w-1/2 px-4 py-2 text-left text-gray-700">
              Genres
            </th>
            <th className="w-1/2 px-4 py-2 text-left text-gray-700">
              Published
            </th>
          </tr>
          {sortedByTitle(books).map(book =>
            <tr key={book.title}>
              <td className="border border-white px-4 py-2">{book.title}</td>
              <td className="border border-white px-4 py-2">{book.author && book.author.name}</td>
              <td className="border border-white px-4 py-2">{book.genres && book.genres.map(genre => genre).join(', ')}</td>
              <td className="border border-white px-4 py-2">{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex flex-row justify-center">
        {genres.map(genre => (
          <button
            value={genre}
            key={uuidv4()}
            onClick={(e) => handleGenre(e)}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 m-2 rounded"
          >
            {genre}
          </button>
        ))}
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={(e) => getAllBooks(e)}
        >
          All books
        </button>
      </div>
    </div>
  )
}

export default Books
