import React from "react";
import RestaurantList from "./RestaurantList";
import RestaurantShow from "../components/RestaurantShow";
// import EditHobbit from "./EditHobbit";
import { fetchInitialRestaurants } from "../actions";
import { connect } from "react-redux";

class RestaurantsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchInitialRestaurants()
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
          {this.props.restaurants.selectedRestaurant !== null ? (
            <RestaurantShow selectedRestaurant={this.props.restaurants.selectedRestaurant} />
          ) : (
            <h3>select a restaurant</h3>
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

export default connect(mapStateToProps, { fetchInitialRestaurants })(RestaurantsContainer);
