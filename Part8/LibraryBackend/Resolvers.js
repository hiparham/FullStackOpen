const { GraphQLError } = require("graphql");
const Author = require("./models/Author");
const User = require("./models/User");
const Book = require("./models/Book");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const resolvers = {
  Author: {
    bookCount: async () => await Book.countDocuments(),
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
        const foundAuthor = await this.Author.findOne({ name: args.author });
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
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
