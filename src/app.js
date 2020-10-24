import { Container } from "react-bootstrap";
import ApolloProvider from "./apollo-provider";
import Register from "./pages/register";

const App = () => {
  return (
    <ApolloProvider>
      <Container className="pt-5">
        <Register />;
      </Container>
    </ApolloProvider>
  );
};

export default App;
