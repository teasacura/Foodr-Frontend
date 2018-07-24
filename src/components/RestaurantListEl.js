import React from "react";
import { selectRestaurant } from "../actions";
import { connect } from "react-redux";


const RestaurantListEl = (props) => {
    const { restaurant } = props
    return (
      <div className="ui segment" onClick={() => {props.selectRestaurant(restaurant)}}>
        <h3>{restaurant.name}</h3>
      </div>
    );
}

export default connect(null, { selectRestaurant })(RestaurantListEl);
