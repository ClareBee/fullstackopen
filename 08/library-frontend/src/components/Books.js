
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    published
  }
}
`
const Books = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks
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
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
