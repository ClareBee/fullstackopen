import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import UpdateAuthor from './UpdateAuthor'
import { ALL_AUTHORS } from '../graphql/queries'

const Authors = ({ show, token }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (loading) {
    return <div className="text-2xl text-gray-700 p-4 shadow-lg">Loading...</div>
  }
  if (!data) {
    return <div className="text-2xl text-gray-700 p-4 shadow-lg"><p>Back end not connected</p></div>
  }
  const authors = data.allAuthors

  return (
    <div className="w-100 p-5 bg-gray-300 shadow-lg border-4 border-white rounded">
      <h2 className="text-3xl text-gray-700">Authors</h2>
      <hr className="h-1 bg-pink-700" />
      {error &&
         <div style={{ color: 'red' }}>
           {error.graphQLErrors}
         </div>
      }
      <table className="table-auto mb-4">
        <tbody>
          <tr>
            <th className="w-1/2 px-4 py-2 text-left text-gray-700">
              Author
            </th>
            <th className="w-1/2 px-4 py-2 text-left text-gray-700">
              Born
            </th>
            <th className="w-1/2 px-4 py-2 text-left text-gray-700">
              Books
            </th>
          </tr>
          {authors.map(author =>
            <tr key={author.name}>
              <td className="border border-white px-4 py-2">{author.name}</td>
              <td className="border border-white px-4 py-2">{author.born}</td>
              <td className="border border-white px-4 py-2">{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <UpdateAuthor authors={authors} token={token}/>
    </div>
  )
}

export default Authors
