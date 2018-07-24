import React, { Component } from 'react'
import { connect } from "react-redux";
// import { NavLink } from 'react-router-dom'
import { logOut } from "../actions";

// const link = {
//   width: '100px',
//   padding: '12px',
//   margin: '0 6px 6px',
//   background: 'blue',
//   textDecoration: 'none',
//   color: 'white',
// }

class NavBar extends Component {
  handleLogout = () => {
    this.props.logOut();
    localStorage.clear();
  }

  render(){
    return (
      <div>
        {this.props.loggedIn ? (
          <div className="ui pointing menu">
            <a className="item" onClick={this.handleLogout}>
              Log Out
            </a>
            <a className="item">
              Profile
            </a>
            <a className="active item">
              Foodr Search
            </a>
          </div>
        ) : (
          <div className="ui pointing menu">
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
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps, { logOut })(NavBar);
