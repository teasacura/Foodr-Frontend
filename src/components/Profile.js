import React, { Component } from 'react';
import { connect } from "react-redux";
import ProfileMapContainer from './ProfileMapContainer'
import { List, Button } from 'semantic-ui-react'
import { deleteFavoriteRestaurant } from "../actions";

class Profile extends Component {

// handleClick = (id) => {
//   console.log(id);
// }

render() {
  console.log(this.props.currentUser);
  return (
    <div>
      {this.props.currentUser ? (
        <div>
          <div className="ui container">
              <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
              <div className="ui segment">
                <h3>Favorites</h3>
                <List divided verticalAlign='middle' size="huge">
                  {this.props.currentUser.favorites !== undefined ? (
                    this.props.currentUser.favorites.map(rest => (
                      <List.Item key={rest.id}>
                        {/* <List.Icon name='marker' /> */}
                        <List.Content>
                          <List.Header><a target="_blank" href={`${rest.url}`}>{rest.name} </a><Button circular icon="close" onClick={() => this.props.deleteFavoriteRestaurant(rest.favorite_id)}></Button></List.Header>
                        </List.Content>
                      </List.Item>
                    )
                  )) : (<p>Loading?</p>)
                }
              </List>
              </div>
          </div>
          <ProfileMapContainer />
      </div>
    ) : (<p>Loading!</p>)
          }
    </div>
  )
  }
}


const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

// export default connect(mapStateToProps, { fetchInitialRestaurants })(RestaurantsContainer);
export default connect(mapStateToProps, { deleteFavoriteRestaurant })(Profile);

// class Profile extends Component {
//
// render() {
//   console.log(this.props.currentUser);
//   return (
//     <div>
//       {this.props.currentUser ? (
//         <div>
//           <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
//           <div>
//             {this.props.currentUser.favorites !== undefined ? (
//               this.props.currentUser.favorites.map(rest => (
//                 <Button as='div' labelPosition='left'>
//                   <Label as='a' basic>
//                     {rest.name}
//                   </Label>
//                   <Button icon>
//                     <Icon name='remove' />
//                   </Button>
//                 </Button>
//                 )
//               )) : (<p>Loading</p>)
//             }
//           </div>
//           <ProfileMapContainer />
//       </div>
//       ) : (<p>Loading</p>)
//           }
//     </div>
//   )
//   }
// }



// class Profile extends Component {
//
//   render() {
//     // console.log(this.props.currentUser);
//     return (
//       <div>
//         {this.props.currentUser ? (
//           <div>
//             <h1>Welcome to Your Profile, {this.props.currentUser.email}!</h1>
//             <h3>Favorites</h3>
//             <ul>{this.props.currentUser.favorites !== undefined ? (
//               this.props.currentUser.favorites.map(rest => <li key={rest.id}>{rest.name}</li> )
//             ) : (null)}
//             </ul>
//             <ProfileMapContainer />
//           </div>
//         ) : (
//           <p>Loading</p>
//         )
//       }
//       </div>
//     );
//   }
//
// }
