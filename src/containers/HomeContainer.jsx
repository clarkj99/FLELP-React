import React, { Fragment } from "react";
import MyMap from "./MapContainer";
import { Container, Grid, Header, List } from "semantic-ui-react";

class HomeContainer extends React.Component {
  render() {
    return (
      <Grid columns={2} divided style={{ margin: "0 2em" }}>
        <Grid.Column>
          <Header textAlign="center" inverted as="h1">
            Welcome to FLELP
          </Header>
          <Container text className="home-description">
            <Header inverted as="h2">
              Wanna Get Away? Can't Decide What to Have for Lunch?
            </Header>

            <List inverted size="massive">
              <List.Item>
                <List.Icon inverted name="marker" />
                <List.Content>
                  <List.Header as="a">Login or Create an Account</List.Header>
                  <List.Description></List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon inverted name="marker" />
                <List.Content>
                  <List.Header as="a">Set up Your Locations</List.Header>
                  <List.Description></List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon inverted name="marker" />
                <List.Content>
                  <List.Header as="a">
                    Choose Your Favorite Businesses
                  </List.Header>
                  <List.Description></List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Container>
        </Grid.Column>
        <Grid.Column>
          <MyMap favorites={this.props.favorites} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default HomeContainer;
