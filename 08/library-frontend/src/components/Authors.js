import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import UpdateAuthor from './UpdateAuthor'


const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

const Authors = ({ show }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
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
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <UpdateAuthor authors={authors} />
    </div>
  )
}

export default Authors
