import React from "react";
import { selectRestaurant } from "../actions";
import { connect } from "react-redux";
import { Rating } from 'semantic-ui-react'


const RestaurantListEl = (props) => {
    const { restaurant } = props
    return (
      <div className="ui segment" onClick={() => {props.selectRestaurant(restaurant)}}>
          <div>{restaurant.name} <Rating defaultRating={restaurant.rating} maxRating={5}/> {restaurant.price}</div>
      </div>
    );
}

export default connect(null, { selectRestaurant })(RestaurantListEl);
