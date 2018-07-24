import React, { Component } from 'react';
import { connect } from "react-redux";

class Profile extends Component {

  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        {this.props.currentUser ? (
          <div>
            <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
            <ul>{this.props.currentUser.favorites !== undefined ? (
              this.props.currentUser.favorites.map(rest => <li key={rest.id}>{rest.name}</li> )
            ) : (null)}
            </ul>
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
  currentUser: state.user.currentUser
});

// export default connect(mapStateToProps, { fetchInitialRestaurants })(RestaurantsContainer);
export default connect(mapStateToProps)(Profile);
