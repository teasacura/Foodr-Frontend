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
//         {this.props.restaurants.restaurants.length ? (
//           <div className="column">
//             {this.props.restaurants.restaurants.map(rest => <RestaurantListEl key={rest.id} restaurant={rest} />)}
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
        {this.props.restaurants.restaurants.length ? (
                  <List animated verticalAlign='middle'>
                    {this.props.restaurants.restaurants.map(rest =>
                        {
                        return (
                                <List.Item>
                                  <List.Content>
                                    <RestaurantListEl key={rest.id} restaurant={rest} />
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
