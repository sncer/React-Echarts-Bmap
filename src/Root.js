import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import App from './pages/app/App';

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
