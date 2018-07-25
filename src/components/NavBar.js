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
    this.props.postSearch(this.state.term)
  }


  render(){
    // console.log(this.props);
    return (
      <div>
        {this.props.loggedIn ? (
          <div className="ui top attached tabular menu">
            <a className="item" onClick={this.handleLogout}>
              Log Out
            </a>
            <NavLink
              to="/profile"
              exact
              className="item"
              id="site-name"
            >Profile</NavLink>
            <NavLink
              to="/"
              exact
              className="active item"
              id="site-name"
            >Foodr Search</NavLink>
            <div className="right menu">
              <div className="item">
                <div className="ui transparent icon input">
                  <input type="text" placeholder="Search Nearby..." onChange={this.handleChange} name="term"></input>
                  <i className="search link icon" onClick={this.handleSubmit}></i>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ui top attached tabular menu">
            <a className="active item">
              Log In
            </a>
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
    loggedIn: state.user.loggedIn
  }
}

export default withRouter(connect(mapStateToProps, { logOut, postSearch })(NavBar));
