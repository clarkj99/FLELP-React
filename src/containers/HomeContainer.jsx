import React from "react";
import { Container, Header } from "semantic-ui-react";

class HomeContainer extends React.Component {
  render() {
    return (
      <Container fluid textAlign="center">
        <Header as="h2" inverted>
          Welcome to Flelp
        </Header>
      </Container>
    );
  }
}

export default HomeContainer;
