import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const Register = () => {
  const [formVariables, setFormVariables] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmitRegisterForm = (event) => {
    event.preventDefault();
    console.log({ formVariables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center mb-3">Register</h1>
        <Form onSubmit={handleSubmitRegisterForm}>
          <Form.Group>
            <Form.Label>Email address:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formVariables.email}
              onChange={(event) =>
                setFormVariables({
                  ...formVariables,
                  email: event.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={formVariables.username}
              onChange={(event) =>
                setFormVariables({
                  ...formVariables,
                  username: event.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={formVariables.password}
              onChange={(event) =>
                setFormVariables({
                  ...formVariables,
                  password: event.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={formVariables.confirmPassword}
              onChange={(event) =>
                setFormVariables({
                  ...formVariables,
                  confirmPassword: event.target.value,
                })
              }
            />
          </Form.Group>

          <div className="text-center mt-3">
            <Button variant="success" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
