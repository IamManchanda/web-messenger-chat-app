import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../constants/graphql/queries";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../context/auth";

const LoginPage = ({ history }) => {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted(data) {
      dispatch({
        type: "LOGIN",
        payload: data.login,
      });
      history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  const handleSubmitLoginForm = (event) => {
    event.preventDefault();
    loginUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center mb-4">Login</h1>
        <Form onSubmit={handleSubmitLoginForm}>
          <Form.Group>
            <Form.Label className={errors.username && "text-danger"}>
              Username:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={variables.username}
              className={errors.username && "is-invalid"}
              onChange={(event) =>
                setVariables({
                  ...variables,
                  username: event.target.value,
                })
              }
            />
            {errors.username && (
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className={errors.password && "text-danger"}>
              Password:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={variables.password}
              className={errors.password && "is-invalid"}
              onChange={(event) =>
                setVariables({
                  ...variables,
                  password: event.target.value,
                })
              }
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
            <br />
            <br />
            <small>
              Don't have an account? <Link to="/register">Register here</Link>.
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
