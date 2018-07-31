import React from "react";
import { selectRestaurant } from "../actions";
import { connect } from "react-redux";
import { Rating, Button } from 'semantic-ui-react'


const RestaurantListEl = (props) => {
    const { restaurant } = props
    return (
      // className="ui segment"
      <div className="ui clearing segment" onClick={() => {props.selectRestaurant(restaurant)}}>
          <h4>{restaurant.name} <Rating defaultRating={restaurant.rating} maxRating={5}/>{restaurant.price}
            <Button size="tiny" floated='right'>{restaurant.distance}</Button>
            {/* <div className="ui right floated button">{restaurant.distance}</div> */}
          </h4>
      </div>
    );
}

export default connect(null, { selectRestaurant })(RestaurantListEl);
