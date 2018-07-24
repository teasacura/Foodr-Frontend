import React from "react";
import { selectRestaurant } from "../actions";
import { connect } from "react-redux";


const RestaurantListEl = (props) => {
    const { restaurant } = props
    return (
      <div onClick={() => {props.selectRestaurant(restaurant)}}>
        <p>{restaurant.name}</p>
      </div>
    );
}

export default connect(null, { selectRestaurant })(RestaurantListEl);
