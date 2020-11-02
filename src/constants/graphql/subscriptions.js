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

export const NEW_REACTION = gql`
  subscription NewReaction {
    newReaction {
      uuid
      content
      message {
        uuid
        from
        to
      }
    }
  }
`;
