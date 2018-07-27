import React from 'react';
import { apiKey } from '../key.js';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
import { newLocation, postSearch } from "../actions";
// import Marker from './Marker'
// getLocation,


const mapStyle = {
  width: '95%',
  height: '100%'
}

export class MainMapContainer extends React.Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  // componentDidMount() {
  //   this.props.getLocation();
  // }

  onMapClick = (mapProps, map, clickEvent) => {
    const newLatitude = clickEvent.latLng.lat();
    const newLongitude = clickEvent.latLng.lng();
    const selectedLocation = {
      latitude: newLatitude,
      longitude: newLongitude
     }
     this.props.newLocation(selectedLocation)
     this.props.postSearch("Food", newLatitude, newLongitude)
    }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  render() {
    // const {latitude, longitude} = this.props.location
    console.log(this.props);
    const icon = {
      // https://loc8tor.co.uk/wp-content/uploads/2015/08/stencil.png
            url: "http://www.portlandchronicle.com/wp-content/uploads/leaflet-maps-marker-icons/map-pin-blue-th.png", // url
            scaledSize: new this.props.google.maps.Size(25, 40), // scaled size
        };
    return (
      <div>
        {!this.props.location ? (<div>Loading...</div>
        ) : (
          <Map google={this.props.google}
            style={mapStyle}
            initialCenter={{
              lat: this.props.location.latitude,
              lng: this.props.location.longitude
            }}
            zoom={14}
            onClick={this.onMapClick}>

            {this.props.restaurants ? (this.props.restaurants.map(rest => {
              return <Marker key={rest.id}
                onClick={this.onMarkerClick}
                name={rest.name}
                position={{lat: rest.latitude, lng: rest.longitude}}
              />
            })
          ) : (null)}

          <Marker
            icon={icon}
            name={'Current Location'}
            position={{lat: this.props.location.latitude, lng: this.props.location.longitude}}
          />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      )
    }
      </div>
    );
  }
}

const mapStateToProps = state =>({
  restaurants: state.restaurants.restaurants,
  location: state.user.location
})

export default connect(mapStateToProps, { newLocation, postSearch })(GoogleApiWrapper({
  apiKey: apiKey
})(MainMapContainer))
