import React from "react";

import RestaurantList from "./RestaurantList";
import RestaurantShow from "../components/RestaurantShow";
import MainMapContainer from "../components/MainMapContainer";

import { fetchInitialRestaurants, postFavoriteRestaurant, getLocation } from "../actions";
import { connect } from "react-redux";


class RestaurantsContainer extends React.Component {
  componentDidMount() {
    this.props.getLocation();
    this.props.fetchInitialRestaurants()
      // "Food", this.props.location.latitude, this.props.location.longitude)
  }

  handleFavoriteClick = (id) => {
    this.props.postFavoriteRestaurant(id)
  }

  // handleClick = (e) => {
  //   console.log(e.target);
  // }

  render() {
    console.log(this.props)
    // console.log(this.props.restaurants.selectedRestaurant);
    return (
      <div className="ui grid">
        <div className="six wide column">
          {this.props.restaurants !== null ? (
            <RestaurantList restaurants={this.props.restaurants}/>
          ) : (
            <p>Loading...</p>
          )}
        </div>
          <div className="ten wide column">
              <MainMapContainer />
          {this.props.selectedRestaurant !== null ? (
            <RestaurantShow selectedRestaurant={this.props.selectedRestaurant} addFavorite={this.handleFavoriteClick}/>
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  restaurants: state.restaurants.restaurants,
  selectedRestaurant: state.restaurants.selectedRestaurant,
  location: state.user.location
  // state.restaurants.find(r => r.id === state.selectedRestaurant)
});

export default connect(mapStateToProps, { fetchInitialRestaurants, postFavoriteRestaurant, getLocation })(RestaurantsContainer);
