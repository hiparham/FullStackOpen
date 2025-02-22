const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDb = require("./Connectdb");
require("dotenv").config();
const Author = require("./Author");
const Book = require("./Book");

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
author:String!
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
    bookCount: (root) => {
      return books.filter((x) => x.author === root.name).length;
    },
  },
  Query: {
    initialize: async () => {
      const allPromises = books.map(async (book) => {
        const authorFound = await Author.findOne({ name: book.author });
        const newBook = new Book({ ...book, author: authorFound._id });
        return newBook.save();
      });
      await Promise.all(allPromises);
      return await Book.find({});
    },
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let returnedBooks = books;
      if (args.author) {
        returnedBooks = returnedBooks.filter((x) => x.author === args.author);
      }
      if (args.genre) {
        returnedBooks = returnedBooks.filter((x) =>
          x.genres.includes(args.genre)
        );
      }
      return returnedBooks;
    },
    allAuthors: () => authors,
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
