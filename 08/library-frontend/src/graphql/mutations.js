import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $authorInput: AuthorInput!, $published: Int!, $genres: [String!]) {
    addBook (
      title: $title
      authorInput: $authorInput
      published: $published
      genres: $genres
    ){
      title
      author {
        name
      }
      published
      genres
    }
  }
`
