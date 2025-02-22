require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDb = require("./Database/Connectdb");
const Author = require("./models/Author");
const Book = require("./models/Book");
const setupdb = require("./Database/SetUpDb");

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

type Query {
initialize:[Book!]!
bookCount:Int!
authorCount:Int!
allBooks(author:String,genre:String):[Book!]!
allAuthors:[Author!]!
}

type Mutation{
addBook(title:String!,published:Int!,author:String!,genres:[String!]!):Book
editAuthor(name:String!,setBornTo:Int!):Author
}

`;

const resolvers = {
  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root._id }),
  },
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.genre) query.genres = args.genre;
      if (args.author) query.author = args.author;
      return await Book.find(query).populate("author");
    },
    allAuthors: async () => await Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {},
    editAuthor: async (root, args) => {},
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

connectDb().then(() => {
  startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  }).then(({ url }) => {
    console.log(`Server Running at ${url}`);
  });
});
