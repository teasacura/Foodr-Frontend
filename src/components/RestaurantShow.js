import React from "react";


const RestaurantShow = (props) => {
    const { image_url, name, address, url, is_closed, reviews, rating, do_delivery } = props.selectedRestaurant
    return (
      <div>
        <div className="ui small centered image">
          <img src={image_url} styles={{maxHeight: '10px'}} alt=""></img>
        </div>
        <h1>{name}</h1>
        <h3>{address}</h3>
        <div className="ui four column doubling stackable grid container">
          <div className="column">
            <p>Number of Reviews: {reviews}</p>
            <p>Rating: {rating} </p>
            <p>{do_delivery ? "Delivers Food" : "No Food Delivery"}</p>
          </div>
          <div className="column">
            <p><a href={url}>Website</a></p>
            <p>{is_closed ? "Currently Closed" : "Currently Open" }</p>
          </div>
        </div>

      </div>
    );
}

export default RestaurantShow;
