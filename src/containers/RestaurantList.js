import React from "react";
import RestaurantListEl from "../components/RestaurantListEl";
import { List } from 'semantic-ui-react'


// import { connect } from "react-redux";
// import { fetchInitialRestaurants } from "../actions";

class RestaurantList extends React.Component {

//   render() {
//     // console.log(this.props);
//     return (
//       <div>
//         <h2>Restaurants</h2>
//         {this.props.restaurants !== undefined ? (
//           <div className="column">
//             {this.props.restaurants.map(rest => <RestaurantListEl key={rest.id} restaurant={rest} />)}
//           </div>
//         ) : (
//           <p>Loading</p>
//           )
//         }
//       </div>
//     )
//   }
//
// }

  render() {
    return(
      <div>
        {this.props.restaurants !== undefined ? (
                  <List animated verticalAlign='middle'>
                    {this.props.restaurants.map(rest =>
                        {
                        return (
                                <List.Item key={rest.id}>
                                  <List.Content>
                                    <RestaurantListEl restaurant={rest} />
                                  </List.Content>
                                </List.Item>
                              );
                        }
                      )}
                  </List>
                ) : (
                  <p>Loading</p>
                  )
                }
          </div>)
        }

  }


export default RestaurantList;
