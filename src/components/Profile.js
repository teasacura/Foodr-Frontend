import React, { Component } from 'react';
import { connect } from "react-redux";
import ProfileMapContainer from './ProfileMapContainer'
import { Button, Header, Icon, Image, Modal, List } from 'semantic-ui-react'
import { deleteFavoriteRestaurant } from "../actions";

class Profile extends Component {

render() {
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
                        <List.Content>
                          <Modal trigger={<Button>{rest.name}</Button>} closeIcon>
                          <Modal.Header>Profile Picture</Modal.Header>
                          <Modal.Content image scrolling>
                            <Image size='small' src={rest.image_url} wrapped />
                              <Modal.Description>
                                <h3><a
                                  target="_blank"
                                  href={`https://www.google.com/maps/dir/?api=1&origin=${this.props.location.latitude}%2C${this.props.location.longitude}&destination=${rest.latitude}%2C${rest.longitude}`}>{rest.address}</a></h3><br></br>
                                <p><a target="_blank" href={rest.url}>YelpSite</a></p><br></br>
                                <p>Phone: <a href={`tel:+${rest.phone}`}>{rest.phone}</a></p>
                              </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                              <Button primary onClick={() => this.props.deleteFavoriteRestaurant(rest.favorite_id)}>
                                Delete <Icon name='close' />
                              </Button>
                            </Modal.Actions>
                          </Modal>
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
  currentUser: state.user.currentUser,
  location: state.user.location
});
