import { Fragment, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Col } from "react-bootstrap";
import { GET_MESSAGES } from "../constants/graphql/queries";
import { useMessageState, useMessageDispatch } from "../context/message";
import Message from "./message";

const Messages = () => {
  const dispatch = useMessageDispatch();

  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true);

  const messages = selectedUser?.messages;

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

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

  return (
    <Col xs={8} className="messages-box d-flex flex-column-reverse">
      {!messages && !messagesLoading ? (
        <p>Select a friend</p>
      ) : messagesLoading ? (
        <p>Loading...</p>
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
        <p>You are now connected, send your first message.</p>
      ) : null}
    </Col>
  );
};

export default Messages;
