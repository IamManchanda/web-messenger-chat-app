import { Container } from "react-bootstrap";
import ApolloProvider from "./apollo-provider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
  return (
    <ApolloProvider>
      <BrowserRouter>
        <Container className="pt-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
