const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uui } = require("uuid");
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky",
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz",
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `

type Author {
name:String!
id:ID!
born:Int
bookCount:Int!
}

type Book {
title:String!
published:Int!
author:String!
id:ID!
genres:[String!]!
}

type Query {
bookCount:Int!
authorCount:Int!
allBooks(author:String,genre:String):[Book!]!
allAuthors:[Author!]!
}
type Mutation {
addBook(title:String,published:Int!,author:String,genres:[String!]!):Book
editAuthor(name:String!,setBornTo:Int!):Author
}
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let returnedBooks = books;
      if (args.author) {
        returnedBooks = returnedBooks.filter(
          (book) => book.author === args.author
        );
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
  Author: {
    bookCount: (root) => {
      return books.filter((x) => x.author === root.name).length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uui() };
      books = books.concat(newBook);
      const authorFound = authors.find((x) => x.name === args.author);
      if (!authorFound) {
        authors = authors.concat({ name: args.author, id: uui() });
      }
      return newBook;
    },
    editAuthor: (root, args) => {
      const foundAuthor = authors.find((x) => x.name === args.name);
      if (!foundAuthor) return null;
      const newAuthor = { ...foundAuthor, born: args.setBornTo };
      authors = authors.map((x) =>
        x.name !== foundAuthor.name ? x : newAuthor
      );
      return newAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
