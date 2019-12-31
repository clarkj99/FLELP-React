import React, { Fragment } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { Segment } from "semantic-ui-react";

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

    map.fitBounds(bounds);
    // map.panToBounds(bounds);
  };

  render() {
    const mapStyles = { width: "100%", height: "400px", position: "relative" };
    const { favorites } = this.props;

    return (
      <Segment>
        <Map
          onClick={this.onMapClicked}
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          containerStyle={{ position: "relative" }}
          initialCenter={{ lat: 33.8864328, lng: -84.1352602 }}
          onReady={this.adjustMap}
        >
          {favorites.map(favorite => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                key={favorite.id}
                name={favorite.name}
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
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </Segment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_KEY
})(MapContainer);
