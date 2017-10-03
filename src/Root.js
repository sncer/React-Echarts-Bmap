import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import App from './App';

class Root extends Component {
  render() {
    return (
      <Router>
      	<Switch>
      		<Route exact path='/' component={App}/>
      		<Route exact path='/login' component={Login}/>
      		<Route path='/app' component={App}/>
      	</Switch>
      </Router>
    );
  }
}

export default Root;
