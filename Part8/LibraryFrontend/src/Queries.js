import { gql } from "@apollo/client";
const GetAllBooks = gql`
  query {
    allBooks {
      title
      author
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
    $published: Int!
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
      author
    }
  }
`;
const editAuthor = gql`
  mutation EditAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
    }
  }
`;
export { GetAllBooks, getAllAuthors, addNewBook, editAuthor };
