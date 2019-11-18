import { gql } from 'apollo-boost';
import { BOOK_DETAILS } from './book_fragment';

export const ALL_BOOKS = gql`
  {
    allBooks  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const RECOMMENDED_BOOKS = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre)  {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const USER_AND_BOOKS = gql`
{
  me  {
    username
    favoriteGenre
  }
  allBooks  {
    ...BookDetails
  }
}
`
export const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`
