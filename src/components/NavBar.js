import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from "react-redux";
import { withRouter, NavLink } from 'react-router-dom'
import { logOut, postSearch } from "../actions";

class NavBar extends Component {

  state = {
    term: ""
  }

  handleLogout = () => {
    this.props.logOut();
    localStorage.clear();
    this.props.history.push("/")
  }

  handleChange = (e) => {
    this.setState({ term: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const input = document.querySelector("#search")
    this.props.postSearch(this.state.term, this.props.location.latitude, this.props.location.longitude)
    input.value = ""
  }


  render(){
    return (
      <div>
        {this.props.loggedIn ? (
          <div className="ui menu">
            <NavLink
              to="/"
              exact
              className="link red item"
              id="site-name"
            >Foodr</NavLink>
            <NavLink
              to="/profile"
              exact
              className="link item"
            >Profile</NavLink>
            <NavLink
              to="/"
              exact
              className="link item"
            >Foodr Search</NavLink>
            <div className="right menu">
              <div className=" fluid item">
                <div className="ui transparent icon input">
                  <input id="search" type="search" placeholder="Search Food Nearby..." onChange={this.handleChange} name="term"></input>
                  <i className="search link icon" onClick={this.handleSubmit}></i>
                </div>
              </div>
              <a className="item" onClick={this.handleLogout}>
                Log Out
              </a>
            </div>
          </div>
        ) : (
          <div className="ui menu">
            <NavLink
              to="/"
              exact
              className="link active red item"
              id="site-name"
            >Foodr</NavLink>
            <div className="right menu">
              <NavLink
                to="/"
                exact
                className="link item"
              >Log In</NavLink>
            </div>
          </div>
        )}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    location: state.user.location
  }
}

export default withRouter(connect(mapStateToProps, { logOut, postSearch })(NavBar));
