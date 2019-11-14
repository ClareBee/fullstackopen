import { gql } from 'apollo-boost';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

console.log(BOOK_DETAILS)
export default BOOK_DETAILS
