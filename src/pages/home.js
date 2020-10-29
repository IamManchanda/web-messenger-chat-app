import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../context/auth";

const Home = ({ history }) => {
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/login");
  };

  return (
    <Row className="bg-white justify-content-around">
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
  );
};

export default Home;
