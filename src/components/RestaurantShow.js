import React from "react";
import { connect } from "react-redux";
import { Rating, Button, Icon } from 'semantic-ui-react'

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
    //
    // handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

    // handleClick = () => {
    //   this.setState({ active: !this.state.active}, )
    // }

    render(){
      console.log(this.props);
    const { id, image_url, name, address, url, is_closed, reviews, rating, price, do_delivery, latitude, longitude } = this.props.selectedRestaurant
    return (
      // <div className="ui two column centered grid" style={style}>

        <div className="ui container segment" style={style}>
          <div className="column">
            <Button floated="right" circular icon="close" onClick={() => this.props.clearRestaurant()}/>
            {/* <Button floated="right" inverted color='yellow' icon="star outline" onClick={() => this.props.addFavorite(id)}></Button> */}
          {/* </div> */}
          {/* <div className="column"> */}

          {/* here need to fix the button and make event to close "view restaurant" */}
          {/* </div> */}
          {/* <div className="column"> */}
            <div className="ui small centered image">
              <img src={image_url} styles={{maxHeight: '10px'}} alt=""></img>
            </div>
            <h1>{name}</h1>
            <div>
              <Rating defaultRating={rating} maxRating={5} />
              <p>Price: {price}</p>
              {/* <pre>{JSON.stringify(this.state, null, 2)} onRate={this.handleRate}</pre> */}
            </div>
          </div>
          <h3><a
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.latitude}%2C${this.props.longitude}&destination=${latitude}%2C${longitude}`}>{address}</a></h3>
          <div className="ui four column doubling stackable grid container">
          <div className="column">
            <p>Number of Reviews: {reviews}</p>
            <p>Rating: {rating} </p>
            <p>{do_delivery ? "Delivers Food" : "No Food Delivery"}</p>
          </div>
          <div className="column">
            <p><a href={url}>YelpSite</a></p>
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

const mapStateToProps = state => ({
  latitude: state.user.location.latitude,
  longitude: state.user.location.longitude
  // state.restaurants.find(r => r.id === state.selectedRestaurant)
});


export default connect(mapStateToProps, { clearRestaurant })(RestaurantShow);
