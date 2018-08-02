import React from 'react';
import { apiKey } from '../key.js';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { connect } from "react-redux";
import { newLocation, postSearch, selectRestaurant } from "../actions";
import { debounce } from 'lodash'

// let eventTimeout;


const mapStyle = {
  width: '95%',
  height: '100%'
}

export class MainMapContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
      if (this.state.activeMarker === nextState.activeMarker && this.props === nextProps) {
        return false
      }
      return true
  }


  onMapClick = (mapProps, map, clickEvent) => {
    const newLatitude = clickEvent.latLng.lat();
    const newLongitude = clickEvent.latLng.lng();
    const selectedLocation = {
      latitude: newLatitude,
      longitude: newLongitude
     }
     this.props.newLocation(selectedLocation)
     this.setState({showingInfoWindow: false})
     this.props.postSearch("Food", newLatitude, newLongitude)
    }

    // There is a google maps bug of moving cursor several times over and out

  // showPopUpOfMarker = (props, marker, e) => {
  //     console.log(e);
  //     clearTimeout(eventTimeout);
  //     eventTimeout = setTimeout(function(){
  //             console.log("Mouse over");
  //             this.setState({
  //               selectedPlace: props,
  //               activeMarker: marker,
  //               showingInfoWindow: true
  //             });
  //     }.bind(this),
  //     500);
  //   }

  // hidePopUpOfMarker = (e) => {
  //   // console.log("out");
  //         console.log("Mouse out")
  //         this.setState({showingInfoWindow:false})
  //        // If we already left marker, clear the timeout
  //        clearTimeout(eventTimeout);
  //      }

 // onMarkerClick = (props, marker, e) =>
 //   this.setState({
 //     selectedPlace: props,
 //     activeMarker: marker,
 //     showingInfoWindow: true
 //   });

  onMouseOverMarker = (props, marker, e) => {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  }

  handleMouseEnter = (props, marker, e) => {
    // console.log(marker);
    // console.log('state marker', this.state.activeMarker);
      if (this.state.activeMarker.name !== marker.name) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
          })
      }
      // if (marker === this.state.activeMarker) {
      //   console.log("same");
      // } else {
      //   console.log("hello");
      //   this.setState({
      //     selectedPlace: props,
      //     activeMarker: marker,
      //     showingInfoWindow: true
      //   })
      // }
    }

  handleMouseLeave = (e) => {
    console.log(e);
        this.setState({
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
        }, console.log(this.state))
    }

  windowHasOpened = () => {
    const title = document.getElementById("title")
    title.addEventListener("click", (e) => {
      const selection = this.props.restaurants.filter(rest => rest.name === e.target.innerHTML)
      this.props.selectRestaurant(selection[0])
      this.setState({showingInfoWindow: false})
    })
  }

  render() {
    // console.log(this.props);
    // const {latitude, longitude} = this.props.location
    const icon = {
      // https://loc8tor.co.uk/wp-content/uploads/2015/08/stencil.png
            url: "http://www.portlandchronicle.com/wp-content/uploads/leaflet-maps-marker-icons/map-pin-blue-th.png", // url
            scaledSize: new this.props.google.maps.Size(25, 40), // scaled size
        };
    // const iw = this.infowindow = new google.maps.InfoWindow({ content: `<div id="iwc"><h1></h1><div/>` });

    return (
      <div>
        {/* {this.props.loading ? (
          // <div>Loading...</div>
          <div className="ui segment">
            <div className="ui active inverted dimmer">
              <div className="ui mini text loader">Loading</div>
            </div>
            <p></p>
            <p></p>
            <p></p>
          </div>
        ) : ( */}
          <Map google={this.props.google}
            style={mapStyle}
            center={{
              lat: this.props.location.latitude,
              lng: this.props.location.longitude
            }}
            zoom={14}
            onClick={this.onMapClick}>

            {this.props.restaurants ? (this.props.restaurants.map(rest => {
              return <Marker key={rest.id}
                // onClick={this.onMarkerClick}
                onMouseover={this.handleMouseEnter}
                onMouseout={debounce(this.handleMouseLeave, 1500)}
                name={rest.name}
                position={{lat: rest.latitude, lng: rest.longitude}}
              />
            })
          ) : (null)}

          <Marker
            id="current"
            icon={icon}
            name={'Current Location'}
            position={{lat: this.props.location.latitude, lng: this.props.location.longitude}}
          />

          <InfoWindow
            onOpen={this.windowHasOpened}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1 id="title">{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      // )
    // }
      </div>
    );
  }
}

const mapStateToProps = state =>({
  restaurants: state.restaurants.restaurants,
  location: state.user.location,
  loading: state.user.loading
})

export default connect(mapStateToProps, { newLocation, postSearch, selectRestaurant })(GoogleApiWrapper({
  apiKey: apiKey
})(MainMapContainer))
