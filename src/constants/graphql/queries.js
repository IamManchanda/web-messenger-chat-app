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
      createdAt
      imageUrl
      latestMessage {
        uuid
        content
        from
        to
        createdAt
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      content
      from
      to
      createdAt
      reactions {
        uuid
        content
      }
    }
  }
`;
