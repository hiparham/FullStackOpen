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
    }
  }
`;
export { GetAllBooks, getAllAuthors };
