import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Col } from "react-bootstrap";
import { GET_MESSAGES } from "../constants/graphql/queries";

const Messages = ({ selectedUser }) => {
  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({
        variables: {
          from: selectedUser,
        },
      });
    }
  }, [getMessages, selectedUser]);

  return (
    <Col xs={8}>
      {messagesData && messagesData.getMessages.length > 0 ? (
        messagesData.getMessages.map((message) => (
          <p key={message.uuid}>{message.content}</p>
        ))
      ) : (
        <p>Messages</p>
      )}
    </Col>
  );
};

export default Messages;
