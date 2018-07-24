import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import './App.css'

class App extends Component {
  render() {
    return (
        <div>
          <NavBar />
          <MainPage />
        </div>
    );
  }
}


export default App;
