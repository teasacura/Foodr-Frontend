import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Link, Redirect } from 'react-router-dom'

class Profile extends Component {

  render() {
    return (
      <div>
        {this.props.currentUser ? (
          <div>
            <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
            <p>Here we'll have favorite restaurants, etc.</p>
          </div>
        ) : (
          <p>Loading</p>
        )
      }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

// export default connect(mapStateToProps, { fetchInitialRestaurants })(RestaurantsContainer);
export default connect(mapStateToProps)(Profile);
