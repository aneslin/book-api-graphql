const { gql } = require('apollo-server-express')


const typeDefs= gql`
type User {
    _id:ID
    username:String
    email:String
    savedBooks:[Book]

}

type Book {
    _id:ID
    authors:[Author]
    description:String
    bookId: String
    image: String
    link:String
    title: String
}

type Author{
    _id:ID
    name:String
}

type Query{
    users:[User]
    
   
}

`

module.exports = typeDefs