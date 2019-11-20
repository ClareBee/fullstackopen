import React, { useState } from 'react'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    props.addBook({ variables: { authorInput: { name: author }, title, published, genres }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className="w-100 p-5 m-2 bg-gray-300">
      <form
        onSubmit={submit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 m-auto"
      >
        <div className="mb-4">
          <label
            for="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            for="author"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Author
          </label>
          <input
            id="author"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            for="published"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Published
          </label>
          <input
            id="published"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div className="mb-4">
          <label
            for="genre"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Genres
          </label>
          <input
            type="text"
            value={genre}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={({ target }) => setGenre(target.value)}
          />
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 m-4 rounded"
            onClick={addGenre}
            type="button"
          >
            Add genre
          </button>
        </div>
        <div className="mb-4 text-gray-700">
          Genres: {genres.join(' ')}
        </div>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create Book
        </button>
      </form>
    </div>
  )
}

export default NewBook
