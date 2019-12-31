import React, { Fragment } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { Image, Card, Icon, Message } from "semantic-ui-react";

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  adjustMap = (mapProps, map) => {
    const { google, markers } = mapProps;
    const bounds = new google.maps.LatLngBounds();

    this.props.favorites.forEach(favorite => {
      bounds.extend({
        lat: favorite.latitude,
        lng: favorite.longitude
      });
    });
    if (!this.props.favorites) map.fitBounds(bounds);
    // map.panToBounds(bounds);
  };

  render() {
    const mapStyles = { width: "100%", height: "500px", position: "relative" };
    const { favorites } = this.props;
    console.log(favorites);
    return (
      <Fragment>
        {!favorites.length && (
          <Message
            attached="top"
            warning
            header="You don't have any Favorite Businesses Saved!"
            content="Do something about that to see your favorite businesses here!"
          ></Message>
        )}
        <Map
          onClick={this.onMapClicked}
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          containerStyle={{ position: "relative" }}
          initialCenter={{ lat: 33.8864328, lng: -84.1352602 }}
          onReady={this.adjustMap}
        >
          {favorites &&
            favorites.map(favorite => {
              return (
                <Marker
                  onClick={this.onMarkerClick}
                  key={favorite.id}
                  name={favorite.name}
                  address={favorite.location}
                  phone={favorite.phone}
                  image={favorite.image_url}
                  position={{
                    lat: favorite.latitude,
                    lng: favorite.longitude
                  }}
                ></Marker>
              );
            })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <Card>
              <Image
                className="marker-image"
                src={this.state.selectedPlace.image}
              />
              <Card.Content>
                <Card.Header>{this.state.selectedPlace.name}</Card.Header>
                <Card.Description>
                  <Icon name="home" />
                  {this.state.selectedPlace.address}
                  <br />
                  <Icon name=" phone" />
                  {this.state.selectedPlace.phone}
                </Card.Description>
              </Card.Content>
            </Card>
          </InfoWindow>
        </Map>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_KEY
})(MapContainer);
