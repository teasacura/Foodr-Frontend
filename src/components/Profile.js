import React, { Component } from 'react';
import { connect } from "react-redux";
import ProfileMapContainer from './ProfileMapContainer'
import { Icon, List } from 'semantic-ui-react'

class Profile extends Component {

  render() {
    console.log(this.props.currentUser);
    return (
      <div>
        {this.props.currentUser ? (
          <div>
            <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
            <h6>Favorites</h6>
            <ul>{this.props.currentUser.favorites !== undefined ? (
              this.props.currentUser.favorites.map(rest => <li key={rest.id}>{rest.name}</li> )
            ) : (null)}
            </ul>
            <ProfileMapContainer />
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


// class Profile extends Component {
//
// render() {
//   console.log(this.props.currentUser);
//   return (
//     <div>
//       {this.props.currentUser ? (
//         <div>
//           <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
//           <List>
//             {this.props.currentUser.favorites !== undefined ? (this.props.currentUser.favorites.map(rest => (
//                   <List.Item key={rest.id}>
//                     <Icon name='right triangle'></Icon>
//                     <List.Content>
//                       <List.Header>{rest.name}</List.Header>
//                     </List.Content>
//                   </List.Item>
//                 )
//               ))
//             }
//           </List>
//           <ProfileMapContainer />
//         </div>
//       ) : (
//               <p>Loading</p>
//             )
//           }
//     </div>
//   )
// }
