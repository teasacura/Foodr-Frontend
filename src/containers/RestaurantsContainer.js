import React from "react";
import { Dimmer, Button } from 'semantic-ui-react'

import RestaurantList from "./RestaurantList";
import RestaurantShow from "../components/RestaurantShow";
import MainMapContainer from "../components/MainMapContainer";

import { fetchInitialRestaurants, postFavoriteRestaurant, getLocation } from "../actions";
import { connect } from "react-redux";


class RestaurantsContainer extends React.Component {

  state ={
    active: true
  }
  // componentDidMount() {
  //   this.props.getLocation()
  //   this.props.fetchInitialRestaurants(this.props.location)
  // }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.fetchInitialRestaurants(this.props.location)
    }
  }

  handleFavoriteClick = (id) => {
    this.props.postFavoriteRestaurant(id)
  }

  handleSearchClick = (e) => {
    this.props.getLocation()
    this.setState({active:false})
  }

  render() {
    const { active } = this.state
    console.log(this.props.location)
    console.log(this.props.loading)
    // this.props.fetchInitialRestaurants(this.props.location)
    // console.log(this.props.restaurants.selectedRestaurant);
    return (
      <div className="ui grid">
        <Dimmer active={active} page>
          <Button negative size="big" onClick={this.handleSearchClick}>Search Food Near Me!</Button>
        </Dimmer>
        <div className="six wide column mobile hidden">
          {this.props.restaurants !== null ? (
            <RestaurantList restaurants={this.props.restaurants}/>
          ) : (
            <p>Loading...</p>
          )}
        </div>
          <div className="ten wide column">
              <MainMapContainer />
          {this.props.selectedRestaurant !== null ? (
            <RestaurantShow
              location={this.props.location}
              selectedRestaurant={this.props.selectedRestaurant}
              addFavorite={this.handleFavoriteClick}
            />
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
  location: state.user.location,
  loading: state.user.loading
  // state.restaurants.find(r => r.id === state.selectedRestaurant)
});

export default connect(mapStateToProps, { fetchInitialRestaurants, postFavoriteRestaurant, getLocation })(RestaurantsContainer);
