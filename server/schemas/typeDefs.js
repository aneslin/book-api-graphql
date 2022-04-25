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
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
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
    createUser(email:String!, username:String!, password:String!): Auth
    
    saveBook(
      authors: [String]
      description: String
      bookId: String
      image: String
      link: String
      title: String
    ): User

  
  
  deleteBook(  savedBookId: String!): User
  cleanBook(username: String!):User

  }
`;


module.exports = typeDefs;
