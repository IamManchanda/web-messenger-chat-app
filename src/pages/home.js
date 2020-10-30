import { useQuery } from "@apollo/client";
import { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GET_USERS } from "../constants/graphql/queries";
import { useAuthDispatch } from "../context/auth";

const Home = ({ history }) => {
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/login");
  };

  const { loading, data, error } = useQuery(GET_USERS);
  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
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
        <Col xs={4}>
          {!data || loading ? (
            <p>Loading...</p>
          ) : data.getUsers.length === 0 ? (
            <p>No users have joined yet.</p>
          ) : data.getUsers.length > 0 ? (
            data.getUsers.map((user) => (
              <div key={user.username}>
                <p>{user.username}</p>
              </div>
            ))
          ) : null}
        </Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
