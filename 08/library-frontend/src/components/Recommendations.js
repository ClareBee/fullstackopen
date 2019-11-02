import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useApolloClient } from '@apollo/react-hooks'


const USER = gql`
{
  me  {
    username
    favoriteGenre
  }
}
`

const Recommendations = ({ token, show }) => {
  const client = useApolloClient(USER)

  if (!show) {
    return null
  }

  if(!token){
    return (
      <p>You need to log in to see this page</p>
    )
  }
  const showUser = async () => {
      const { data } = await client.query({
        query: USER,
        fetchPolicy: 'no-cache'
      })
      console.log('data', data)
    }
    showUser()
  return (
    <p>hi</p>
  )
}

export default Recommendations
