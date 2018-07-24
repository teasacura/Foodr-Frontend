import React from "react";
import { apiKey } from '../key.js'
import RestaurantList from "./RestaurantList";
import RestaurantShow from "../components/RestaurantShow";
// import MapWithAMarkedInfoWindow from "../components/MapWithAMarkedInfoWindow";
// import EditHobbit from "./EditHobbit";
import { fetchInitialRestaurants, postFavoriteRestaurant } from "../actions";
import { connect } from "react-redux";
const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");


function getLongituteLatitude(position) {
  return position
}

const position = navigator.geolocation.getCurrentPosition(getLongituteLatitude)
// const { latitude, longitude } = position.coords

console.log(position)

const MapWithAMarkedInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    // defaultCenter={{ lat: latitude, lng: longitude }}
    defaultCenter={{ lat: 40.7007397, lng:
-73.9878059 }}
  >
    <Marker
      // position={{ lat: latitude, lng: longitude }}
      position={{ lat: 40.7007397, lng:
-73.9878059 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <p>HELLO WORLD</p>
      </InfoWindow>}
    </Marker>
  </GoogleMap>
);

class RestaurantsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchInitialRestaurants()
  }

  handleClick = (id) => {
    this.props.postFavoriteRestaurant(id)
  }

  render() {
    // console.log(this.props)
    // console.log(this.props.restaurants.selectedRestaurant);
    return (
      <div className="ui grid">
        <div className="six wide column">
          <RestaurantList restaurants={this.props.restaurants}/>
        </div>
          <div className="ten wide column">
              <MapWithAMarkedInfoWindow
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
          {this.props.restaurants.selectedRestaurant !== null ? (
            <RestaurantShow selectedRestaurant={this.props.restaurants.selectedRestaurant} addFavorite={this.handleClick}/>
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  restaurants: state.restaurants,
  selectedRestaurant: state.selectedRestaurant
  // state.restaurants.find(r => r.id === state.selectedRestaurant)
});

export default connect(mapStateToProps, { fetchInitialRestaurants, postFavoriteRestaurant })(RestaurantsContainer);
