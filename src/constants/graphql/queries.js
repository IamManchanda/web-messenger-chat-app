import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;
