import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

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
`;

export const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String]
    $description: String
    $bookId: String
    $image: String
    $link: String
    $title: String
  ) {
    saveBook(
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      link: $link
      title: $title
    ) {
      savedBooks {
        _id
        authors
        description
        bookId
        image
        title
        link
      }
      username
      _id
      email
    }
  }
`;

