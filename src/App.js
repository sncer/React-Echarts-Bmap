import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Fence from './components/fence/Fence';
import Trace from './components/trace/Trace';
import Notice from './components/notice/Notice';

class App extends Component {
	render() {
		return (
			<div className="warpper">
				<h1>精准扶贫</h1>
				<Nav />
				<Switch>
			      <Route exact path='/' component={Home}/>
			      <Route path='/fence' component={Fence}/>
			      <Route path='/trace' component={Trace}/>
			      <Route path='/notice' component={Notice}/>
			    </Switch>
			</div>
		);
	}
}

export default App;