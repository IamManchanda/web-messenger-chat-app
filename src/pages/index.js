import { Fragment, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Messages from "../components/messages";
import Users from "../components/users";
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
        <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <Messages selectedUser={selectedUser} />
      </Row>
    </Fragment>
  );
};

export default IndexPage;
