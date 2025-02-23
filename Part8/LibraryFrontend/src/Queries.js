import { gql } from "@apollo/client";
const GetAllBooks = gql`
  query getAllBook($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;
const getAllAuthors = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
  }
`;
const addNewBook = gql`
  mutation addNewBook(
    $title: String!
    $author: String!
    $published: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
    }
  }
`;
const editAuthor = gql`
  mutation EditAuthor($name: String!, $year: String!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
    }
  }
`;
const loginQuery = gql`
  mutation loginToApp($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
const getGenres = gql`
  query {
    getGenre
  }
`;
const getmyFavorites = gql`
  query {
    getFavorites {
      title
    }
  }
`;
export {
  GetAllBooks,
  getAllAuthors,
  addNewBook,
  editAuthor,
  loginQuery,
  getGenres,
  getmyFavorites,
};
