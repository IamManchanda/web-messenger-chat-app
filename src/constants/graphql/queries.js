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

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`;
