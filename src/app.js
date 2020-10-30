import { Container } from "react-bootstrap";
import ApolloProvider from "./apollo-provider";
import { BrowserRouter, Switch } from "react-router-dom";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { AuthProvider } from "./context/auth";
import DynamicRoute from "./utils/dynamic-route";

const App = () => {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute
                exact
                path="/"
                component={IndexPage}
                authenticated
              />
              <DynamicRoute path="/login" component={LoginPage} guest />
              <DynamicRoute path="/register" component={RegisterPage} guest />
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
