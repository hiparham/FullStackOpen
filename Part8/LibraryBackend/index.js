require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const connectDb = require("./Database/Connectdb");
const Author = require("./models/Author");
const Book = require("./models/Book");
const setupdb = require("./Database/SetUpDb");
const { GraphQLError } = require("graphql");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

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

const resolvers = {
  Author: {
    bookCount: async (root) => await Book.countDocuments({ author: root._id }),
  },
  Query: {
    getFavorites: async (root, args, context) => {
      return await Book.find({ genres: context.favoriteGenre });
    },
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    getGenre: async () => {
      const books = await Book.find({});
      const allGenres = books.map((x) => x.genres).flat(Infinity);
      const genreSorted = [...new Set(allGenres)];
      return genreSorted;
    },
    allBooks: async (root, args) => {
      let query = {};
      if (args.genre) query.genres = args.genre;
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (!foundAuthor) {
          throw new GraphQLError("Author does not exist");
        }
        query.author = foundAuthor._id;
      }
      return await Book.find(query).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { title, published, author, genres } = args;
      if (!context.username) {
        throw new GraphQLError("Unauthorized.");
      }
      if (!title || title.length < 3) {
        throw new GraphQLError("Title must be at least 3 characters.");
      }
      if (!author || author.length < 3) {
        throw new GraphQLError("Author name must be at least 3 characters.");
      }
      if (!published) {
        throw new GraphQLError("Publication year is required.");
      }
      if (genres.length === 0) {
        throw new GraphQLError("At least one genre is required.");
      }
      const exists = await Book.findOne({ title });
      if (exists) {
        throw new GraphQLError("Book with this title already exists.");
      }
      try {
        let existingAuthor = await Author.findOne({ name: args.author });
        if (!existingAuthor) {
          existingAuthor = await Author.create({
            name: args.author,
            bookCount: 1,
          });
        }
        const newBook = new Book({
          title,
          published,
          author: existingAuthor._id,
          genres,
        });
        await newBook.save();
        return newBook;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    editAuthor: async (root, args, context) => {
      const { name, setBornTo } = args;
      if (!context.username) {
        throw new GraphQLError("Unauthorized.");
      }
      const foundAuthor = await Author.findOne({ name: name });
      if (name.length < 3 || !setBornTo) {
        throw new GraphQLError(`Author name and birthyear must exist`, {
          extensions: {
            code: "BAD_INPUT",
          },
        });
      }
      if (!foundAuthor) {
        throw new GraphQLError(`Author doesn't exist`, {
          extensions: {
            code: "NONEXISTENT",
          },
        });
      }
      const authorUpdates = await Author.findByIdAndUpdate(foundAuthor._id, {
        born: setBornTo,
      });
      return authorUpdates;
    },
    createUser: async (root, args) => {
      const { name, favoriteGenre } = args;
      const userExists = await User.findOne({ username: name });
      if (userExists) {
        throw new GraphQLError("User exists");
      }
      if (favoriteGenre.length < 2) {
        throw new GraphQLError("Favorite genre must exist");
      }
      const user = new User({ username: name, favoriteGenre });
      return await user.save();
    },
    login: async (root, args) => {
      const { username, password } = args;
      const userFound = await User.findOne({ username });
      if (!userFound || password !== "secret") {
        throw new GraphQLError("Wrong Credentials");
      }
      const token = jwt.sign(
        {
          username: userFound.username,
          id: userFound._id,
        },
        process.env.JWT_SECRET
      );
      return { value: token };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
connectDb().then(() => {
  startStandaloneServer(server, {
    context: async ({ req, res }) => {
      let auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decoded = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        return currentUser;
      }
    },
    listen: {
      port: 4000,
    },
  }).then(({ url }) => {
    console.log(`Server Running at ${url}`);
  });
});
