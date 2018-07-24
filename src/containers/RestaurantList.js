import React from "react";
import RestaurantListEl from "../components/RestaurantListEl";
// import { connect } from "react-redux";
// import { fetchInitialRestaurants } from "../actions";

class RestaurantList extends React.Component {
  // componentDidMount() {
  //   this.props.fetchInitialRestaurants()
  // }

  render() {
    // console.log(this.props);
    return (
      <div>
        {this.props.restaurants.restaurants.length ? (
          <div className="column">
            {this.props.restaurants.restaurants.map(rest => <RestaurantListEl key={rest.id} restaurant={rest} />)}
          </div>
        ) : (
          <p>Loading</p>
          )
        }
      </div>
    )
  }

}

export default RestaurantList;