import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter, NavLink } from 'react-router-dom'
import { logOut, postSearch } from "../actions";

// const link = {
//   width: '100px',
//   padding: '12px',
//   margin: '0 6px 6px',
//   background: 'blue',
//   textDecoration: 'none',
//   color: 'white',
// }

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
    // console.log(this.props);
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
              {/* <div className="ui selection dropdown">
                <input type="hidden" name="gender">
                <i className="dropdown icon"></i>
                <div className="default text">Gender</div>
                <div className="menu">
                  <div className="item" data-value="1">Male</div>
                  <div className="item" data-value="1">Male</div>
                  <div className="item" data-value="2">Female</div>
                </div>
              </div>
              <select name="price" multiple="" className="ui selection dropdown">
                <option value="1, 2, 3, 4">All Prices</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
              </select> */}
              <div className=" fluid item">
                <div className="ui transparent icon input">
                  <input id="search" type="search" placeholder="Search Nearby..." onChange={this.handleChange} name="term"></input>
                  {/* onClick={this.handleSubmit} */}
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
              {/* <a className="item">
                Log In
              </a> */}
            </div>
          </div>
        )}
      </div>
    )
  }
}

//   render(){
//     return (
//       <div id="nav">
//         {this.props.loggedIn ? (
//           <div>
//             <div className="nav-link" onClick={this.handleLogout}>
//               Log Out
//             </div>
//             <div className="nav-link">
//               Profile
//             </div>
//           </div>
//         ) : (
//           null
//         )}
//         <div className="nav-link">
//           Foodr Search
//         </div>
//       </div>
//     )
//   }
// }


function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
    location: state.user.location
  }
}

export default withRouter(connect(mapStateToProps, { logOut, postSearch })(NavBar));
