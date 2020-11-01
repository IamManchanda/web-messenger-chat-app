import { Fragment, useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import Messages from "../components/messages";
import Users from "../components/users";
import { useAuthState, useAuthDispatch } from "../context/auth";
import { useMessageDispatch } from "../context/message";
import { NEW_MESSAGE } from "../constants/graphql/subscriptions";

const IndexPage = ({ history }) => {
  const authDispatch = useAuthDispatch();
  const messageDispatch = useMessageDispatch();

  const { user } = useAuthState();

  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE,
  );

  useEffect(() => {
    if (messageError) {
      console.log(messageError);
    }

    if (messageData) {
      const message = messageData.newMessage;
      const otherUser =
        user.username === message.to ? message.from : message.to;

      messageDispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: otherUser,
          message,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageData, messageDispatch, messageError]);

  const handleLogout = () => {
    authDispatch({
      type: "LOGOUT",
    });

    window.location.href = "/login";
  };

  return (
    <Fragment>
      <Row className="bg-white justify-content-around mb-1">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </Row>
      <Row className="bg-white">
        <Users />
        <Messages />
      </Row>
    </Fragment>
  );
};

export default IndexPage;
