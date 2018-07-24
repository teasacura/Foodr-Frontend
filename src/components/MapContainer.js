import React from 'react';
import { apiKey } from '../key.js';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
// import Marker from './Marker'


const style = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends React.Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  mapClicked = (mapProps, map, clickEvent) => {
      console.log(mapProps)
      console.log(clickEvent)
    }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  render() {
    // console.log(this.props.restaurants);
    return (
      <Map google={this.props.google}
          style={style}
          center={{
            lat: 40.7007739,
            lng: -73.9877738
          }}
          zoom={12}
          onClick={this.onMapClicked}>

          {this.props.restaurants ? (this.props.restaurants.map(rest => {
          return <Marker key={rest.id}
              onClick={this.onMarkerClick}
              name={rest.name}
              position={{lat: rest.latitude, lng: rest.longitude}}
            />
          })
        ) : (null)}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants.restaurants,
});

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer))
