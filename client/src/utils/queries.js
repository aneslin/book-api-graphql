import { gql } from "@apollo/client"


export const QUERY_ME = gql`
{
    me {
    _id
    username
    email
    savedBooks {
      title
      authors
      description
      bookId
      image
      link
      title

    }
  }
}
`