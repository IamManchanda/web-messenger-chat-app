import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../constants/graphql/mutations";

const Register = () => {
  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_cache, mutationResult) {
      console.log(mutationResult);
    },
    onError(error) {
      console.log(error.graphQLErrors[0].extensions.errors);
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  const handleSubmitRegisterForm = (event) => {
    event.preventDefault();
    console.log({ variables });
    registerUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center mb-4">Register</h1>
        <Form onSubmit={handleSubmitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors.email && "text-danger"}>
              Email address:
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={variables.email}
              className={errors.email && "is-invalid"}
              onChange={(event) =>
                setVariables({
                  ...variables,
                  email: event.target.value,
                })
              }
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>

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

          <Form.Group>
            <Form.Label className={errors.confirmPassword && "text-danger"}>
              Confirm password:
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={variables.confirmPassword}
              className={errors.confirmPassword && "is-invalid"}
              onChange={(event) =>
                setVariables({
                  ...variables,
                  confirmPassword: event.target.value,
                })
              }
            />
            {errors.confirmPassword && (
              <Form.Text className="text-danger">
                {errors.confirmPassword}
              </Form.Text>
            )}
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
