import { gql } from "@apollo/client";

export const NEW_MESSAGE = gql`
  subscription NewMessage {
    newMessage {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;
