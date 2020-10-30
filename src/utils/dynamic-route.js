import { useAuthState } from "../context/auth";

import { Route, Redirect } from "react-router-dom";

const DynamicRoute = (props) => {
  const { user } = useAuthState();

  if (props.authenticated && !user) {
    return <Redirect to="/login" />;
  }

  if (props.guest && user) {
    return <Redirect to="/" />;
  }

  return <Route component={props.component} {...props} />;
};

export default DynamicRoute;
