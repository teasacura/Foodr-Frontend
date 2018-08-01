import React, { Component } from 'react';
import { logIn, createNewUser } from '../actions'
import { connect } from "react-redux";
// import { Link, Redirect } from 'react-router-dom'

class SignUp extends Component {

  state = {
    fields: {
      email: '',
      password: ''
    }
  };

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const body = this.state.fields

    this.props.createNewUser(body)
    .then(
      this.props.history.push("/")
    )

  };

  // handleLogin = (user) => {
  //   const token = localStorage.getItem('token')
  //   if (!!token) {
  //     console.log("token present")
  //   } else {
  //     localStorage.setItem('token', user.jwt)
  //   }
  //   this.props.logIn(user)
  // }

  render() {
    const { fields } = this.state;
    // styles={{ backgroundImage: `url(${image})`}}
    return (
      <div id="home">
        <h1>Sign Up!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="ui field">
            <label>Email: </label>
            <input
              name="email"
              value={fields.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Password: </label>
            <input
              name="password"
              type="password"
              value={fields.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="ui basic green button">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}


// export default SignUp;
export default connect(null, { logIn, createNewUser })(SignUp);
