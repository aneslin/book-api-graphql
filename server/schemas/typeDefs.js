const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    authors: [Author]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Author {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    saveBook(
      UserID: ID!
      authors: [String]
      description: String
      bookId: String
      image: String
      link: String
      title: String
    ): User
  }
`;

module.exports = typeDefs;
