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
    return <div>loading...</div>
  }
  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      {error &&
         <div style={{ color: 'red' }}>
           {error.graphQLErrors}
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
          {authors.map(author =>
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <UpdateAuthor authors={authors} token={token}/>
    </div>
  )
}

export default Authors
