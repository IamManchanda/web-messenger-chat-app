import { useQuery, useLazyQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET_MESSAGES, GET_USERS } from "../constants/graphql/queries";
import { useAuthDispatch } from "../context/auth";

const Home = ({ history }) => {
  const dispatch = useAuthDispatch();

  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/login");
  };

  const { loading, data, error } = useQuery(GET_USERS);

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

  if (messagesData) {
    console.log(messagesData);
  }

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
        <Col xs={4} className="p-0 bg-secondary">
          {!data || loading ? (
            <p>Loading...</p>
          ) : data.getUsers.length === 0 ? (
            <p>No users have joined yet.</p>
          ) : data.getUsers.length > 0 ? (
            data.getUsers.map((user) => (
              <div
                className="d-flex p-3"
                key={user.username}
                onClick={() => setSelectedUser(user.username)}
              >
                <Image
                  src={user.imageUrl}
                  roundedCircle
                  className="mr-2"
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                  }}
                />
                <div>
                  <p className="text-success">{user.username}</p>
                  <p className="font-weight-light">
                    {user.latestMessage
                      ? user.latestMessage.content
                      : "You are now connected"}
                  </p>
                </div>
              </div>
            ))
          ) : null}
        </Col>
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

export default Home;
