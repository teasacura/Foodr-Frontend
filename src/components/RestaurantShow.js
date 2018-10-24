import React from "react";
import { connect } from "react-redux";
import { Rating, Button } from 'semantic-ui-react'

import { clearRestaurant } from "../actions";

const style = {
  'position': 'fixed',
  'width': '50%'
}


class RestaurantShow extends React.Component {
  constructor(){
    super()

    this.state = {
      active: false
    }

  }

    render(){
    const { id, image_url, name, address, phone, categories, url, is_closed, reviews, rating, price, do_delivery, latitude, longitude } = this.props.selectedRestaurant
    return (
        <div className="ui container segment center aligned" style={style}>
          <div className="column">
            <Button floated="right" circular icon="close" onClick={() => this.props.clearRestaurant()}/>
            <div className="ui small centered image">
              <img src={image_url} styles={{maxHeight: '10px'}} alt=""></img>
            </div>
            <h1>{name}</h1>
            <div>
              <Rating defaultRating={rating} maxRating={5} />
              <p>Price: {price}</p>
            </div>
          </div>
          <h3><a
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.location.latitude}%2C${this.props.location.longitude}&destination=${latitude}%2C${longitude}`}>{address}</a></h3>
          <div className="ui two column doubling stackable grid container">
          <div className="column">
            <p>Phone: <a href={`tel:+${phone}`}>{phone}</a></p>
            <p>Number of Reviews: {reviews}</p>
            <p>Rating: {rating} </p>
            <p>{do_delivery ? "Delivers Food" : "No Food Delivery"}</p>
          </div>
          <div className="column">
            <p>Category: {categories}</p>
            <p><a target="_blank" href={url}>YelpSite</a></p>
            <p>{is_closed ? "Currently Closed" : "Currently Open" }</p>
          </div>
          </div>
          <div>
            <Button fluid onClick={() => this.props.addFavorite(id)}>Add to Favorites</Button>
          </div>
       </div>
    );
  }
}


export default connect(null, { clearRestaurant })(RestaurantShow);
