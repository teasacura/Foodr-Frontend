import React, { Component } from 'react';
import image from "../pizza-image.jpg"
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { postLogin } from '../actions'

class LoginForm extends Component {

  state = {
    fields: {
      email: '',
      password: ''
    }
  };

  // componentDidMount(){
  //   this.props.getLocation()
  // }

  handleChange = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const body = this.state.fields

    this.props.postLogin(body)
    .then(user => this.props.handleLogin(user))
    .catch(error => console.log(this.props.history.push("/")))

    this.setState({
      fields: {
        email: '',
        password: ''
      }
    })
  }


    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify(this.state.fields)
    // }
    // fetch('http://localhost:3000/api/v1/login', options)
    // .then(resp => resp.json())
    // .then(user => {
    //     this.props.handleLogin(user)
    // })

  // };

  render() {
    // console.log(this.state);
    const { fields } = this.state;
    // styles={{ backgroundImage: `url(${image})`}}
    return (
      <div className="ui segment center landing masthead">
      {/* <div className="ui middle aligned center aligned grid"> */}
        <div className="ui text container">
          <h1 className="ui inverted header">Welcome to Foodr!</h1>
          <h2 className="ui inverted header">Finding food near you!</h2>
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
            <button type="submit" className="ui fluid inverted green button">
              Login
            </button>
          </div>
          <Link to="/signup" >Need to sign up?</Link>
        </form>
      </div>
    );
  }
}


export default connect(null, { postLogin })(LoginForm);
