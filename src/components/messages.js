import { Fragment, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Col, Form } from "react-bootstrap";
import { GET_MESSAGES } from "../constants/graphql/queries";
import { useMessageState, useMessageDispatch } from "../context/message";
import Message from "./message";
import { SEND_MESSAGE } from "../constants/graphql/mutations";

const Messages = () => {
  const dispatch = useMessageDispatch();
  const [content, setContent] = useState("");

  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true);

  const messages = selectedUser?.messages;

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted(data) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: selectedUser.username,
          message: data.sendMessage,
        },
      });
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({
        variables: {
          from: selectedUser.username,
        },
      });
    }
  }, [getMessages, selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, messagesData]);

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    if (content.trim() === "" || !selectedUser) return;
    setContent("");
    sendMessage({
      variables: {
        to: selectedUser.username,
        content,
      },
    });
  };

  return (
    <Col xs={8}>
      <div className="messages-box d-flex flex-column-reverse">
        {!messages && !messagesLoading ? (
          <p className="info-text">Select a friend</p>
        ) : messagesLoading ? (
          <p className="info-text">Loading...</p>
        ) : messages.length > 0 ? (
          messages.map((message, index) => (
            <Fragment key={message.uuid}>
              <Message message={message} />
              {index === messages.length - 1 && (
                <div className="invisible">
                  <hr className="m-0" />
                </div>
              )}
            </Fragment>
          ))
        ) : messages.length === 0 ? (
          <p className="info-text">
            You are now connected, send your first message.
          </p>
        ) : null}
      </div>
      <div>
        <Form onSubmit={handleSubmitMessage}>
          <Form.Group className="d-flex align-items-center">
            <Form.Control
              type="text"
              className="message-input rounded-pill p-4 bg-secondary border-0"
              placeholder="Type a message here..."
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <i
              className="fas fa-paper-plane fa-2x text-primary ml-2"
              onClick={handleSubmitMessage}
              role="button"
            />
          </Form.Group>
        </Form>
      </div>
    </Col>
  );
};

export default Messages;
