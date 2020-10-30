import { useLazyQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Users from "../components/users";
import { GET_MESSAGES } from "../constants/graphql/queries";
import { useAuthDispatch } from "../context/auth";

const IndexPage = ({ history }) => {
  const dispatch = useAuthDispatch();

  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/login");
  };

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
        <Users setSelectedUser={setSelectedUser} />
        <Col xs={8}>
          {messagesData && messagesData.getMessages.length > 0 ? (
            messagesData.getMessages.map((message) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>Messages</p>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default IndexPage;
