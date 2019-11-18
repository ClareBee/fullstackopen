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
