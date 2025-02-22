const Author = require("../models/Author");
const Book = require("../models/Book");
//
const books = [
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
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

//

const setupdb = async () => {
  await Book.deleteMany({});
  await Author.deleteMany({});
  await Author.insertMany([
    {
      name: "Robert Martin",
      born: "1952",
    },
    {
      name: "Martin Fowler",
      id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
      born: "1963",
    },
    {
      name: "Fyodor Dostoevsky",
      id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
      born: "1821",
    },
    {
      name: "Joshua Kerievsky",
      id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
      name: "Sandi Metz",
      id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
  ]);
  const allBooks = books.map(async (book) => {
    const authorFound = await Author.findOne({ name: book.author });
    const newBook = {
      ...book,
      author: authorFound._id,
    };
    await Book.create(newBook);
  });
  await Promise.all(allBooks);
  console.log("DONE");
};

module.exports = setupdb;
