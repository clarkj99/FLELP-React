import React from "react";
import MyMap from "./MapContainer";
import { Container } from "semantic-ui-react";

class HomeContainer extends React.Component {
  render() {
    return <MyMap favorites={this.props.favorites} />;
  }
}

export default HomeContainer;
