import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;
