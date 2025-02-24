const typeDefs = `

type Author {
id:ID!
name:String!
born:Int
bookCount:Int!
}

type Book {
title:String!
published:String!
author:Author!
genres:[String!]!
}

type User {
username:String!
favoriteGenre:String!
id:ID!
}

type Token {
value:String!
}

type Query {
getFavorites:[Book!]!
bookCount:Int!
authorCount:Int!
allBooks(author:String,genre:String):[Book!]!
allAuthors:[Author!]!
me:User
getGenre:[String!]!
}

type Mutation{
addBook(title:String!,published:String!,author:String!,genres:[String!]!):Book
editAuthor(name:String!,setBornTo:String!):Author
createUser(name:String!, favoriteGenre:String!):User
login(username:String!,password:String!):Token
}

`;

module.exports = typeDefs;
