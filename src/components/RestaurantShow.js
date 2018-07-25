import React from "react";
import { connect } from "react-redux";
import { Rating, Button } from 'semantic-ui-react'

import { clearRestaurant } from "../actions";

const style = {
  'position': 'fixed'
}


class RestaurantShow extends React.Component {
  constructor(){
    super()

    this.state = {
      active: false
    }

  }
    //
    // handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

    // handleClick = () => {
    //   this.setState({ active: !this.state.active}, )
    // }

    render(){
    const { id, image_url, name, address, url, is_closed, reviews, rating, price, do_delivery } = this.props.selectedRestaurant
    return (
      <div className="ui container segment" style={style}>
        <div className="column">
          <div className="ui small centered image">
            <img src={image_url} styles={{maxHeight: '10px'}} alt=""></img>
          </div>
        </div>
        <h1>{name}</h1>
        <div>
          <Rating defaultRating={rating} maxRating={5} />
          <p>Price: {price}</p>
          {/* <pre>{JSON.stringify(this.state, null, 2)} onRate={this.handleRate}</pre> */}
        </div>
        <h3>{address}</h3>
        <div className="ui four column doubling stackable grid container">
          <div className="column">
            <p>Number of Reviews: {reviews}</p>
            {/* <p>Rating: {rating} </p> */}
            <p>{do_delivery ? "Delivers Food" : "No Food Delivery"}</p>
          </div>
          <div className="column">
            <p><a href={url}>YelpSite</a></p>
            <p>{is_closed ? "Currently Closed" : "Currently Open" }</p>
          </div>
          <div className="column">
            <Button inverted color='yellow' icon="star outline" onClick={() => this.props.addFavorite(id)}></Button>
          </div>
          <div className="column">
            <Button circular icon="close" onClick={() => this.props.clearRestaurant()}/>
            {/* here need to fix the button and make event to close "view restaurant" */}
          </div>
        </div>

      </div>
    );
  }
}


export default connect(null, { clearRestaurant })(RestaurantShow);
