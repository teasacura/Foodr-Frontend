import React, { Component } from 'react';
import { logIn, createNewUser } from '../actions'
import { connect } from "react-redux";

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

  render() {
    const { fields } = this.state;
    return (
      <div id="home">
      <div className="ui segment center landing masthead">
        <div className="ui text container">
          <h1 className="ui inverted header">Sign Up</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="ui large form">
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail address"
                  value={fields.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={fields.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button type="submit" className="ui fluid inverted blue button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      </div>
  }
}


export default connect(null, { logIn, createNewUser })(SignUp);
