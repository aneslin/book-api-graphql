import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email:$email, password:$password){
        token
        user {
            _id
            username

        }
    }
}
`

export const DELETE_BOOK = gql`
mutation Mutation($bookId: String!) {
  deleteBook(savedBookId: $bookId) {
      _id
    username
    email
    savedBooks {
      bookId
      _id
      authors
      description
      image
      link
      title
    }
  }
}
`