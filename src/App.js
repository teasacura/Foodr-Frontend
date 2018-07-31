import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import './App.css'


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={MainPage}></Route>
          <Route exact path="/profile" component={Profile}></Route>
        </div>
      </Router>
    );
  }
}


export default App;
