import { Container } from "react-bootstrap";
import ApolloProvider from "./apollo-provider";
import { BrowserRouter, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthProvider } from "./context/auth";
import DynamicRoute from "./utils/dynamic-route";

const App = () => {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute exact path="/" component={Home} authenticated />
              <DynamicRoute path="/login" component={Login} guest />
              <DynamicRoute path="/register" component={Register} guest />
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
