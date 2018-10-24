import React from "react";
import RestaurantListEl from "../components/RestaurantListEl";
import { List } from 'semantic-ui-react'

class RestaurantList extends React.Component {

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
