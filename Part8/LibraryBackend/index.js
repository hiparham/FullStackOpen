require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDb = require("./Connectdb");
const Author = require("./models/Author");
const Book = require("./models/Book");

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

      console.log(query, "LOL");

      return await Book.find(query).populate("author");
    },
    allAuthors: async () => await Author.find({}),
  },
  Mutation: {
    addBook: (root, args) => {
      if (args.name.length < 3) return;
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);
      if (!authors.find((x) => x.name === args.author)) {
        authors = authors.concat({
          name: args.author,
          id: uuid(),
          bookCount: 1,
        });
      }
      return newBook;
    },
    editAuthor: (root, args) => {
      const foundAuthor = authors.find((x) => x.name === args.name);
      if (!foundAuthor) return null;
      const newAuthor = { ...foundAuthor, born: args.setBornTo };
      authors = authors.map((x) => (x.name === newAuthor.name ? newAuthor : x));
      return newAuthor;
    },
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
